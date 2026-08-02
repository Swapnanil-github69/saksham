const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MongoDB connection failed: MONGODB_URI environment variable is missing.');
    process.exit(1);
  }

  // Parse connection URI to hide password in logs if present
  let safeUri = 'MongoDB Atlas';
  try {
    const parsed = new URL(uri);
    if (parsed.password) {
      parsed.password = '****';
    }
    safeUri = parsed.toString();
  } catch (e) {
    safeUri = uri.replace(/:([^:@]+)@/, ':****@');
  }

  // Hook connection event handlers
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established successfully');
  });

  mongoose.connection.on('error', (err) => {
    let friendlyError = err.message;
    if (friendlyError.includes('Authentication failed') || friendlyError.includes('bad auth')) {
      friendlyError = 'Authentication failed (invalid credentials)';
    } else if (friendlyError.includes('ENOTFOUND') || friendlyError.includes('Server selection timed out') || friendlyError.includes('MongooseServerSelectionError')) {
      friendlyError = 'Network failure (cannot reach MongoDB Atlas cluster)';
    }
    
    // Sanitize any potential leaked connection string from error
    friendlyError = friendlyError.replace(uri, safeUri);
    friendlyError = friendlyError.replace(/:([^:@]+)@/, ':****@');

    console.error('MongoDB connection error:', friendlyError);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
  });

  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('MongoDB Atlas connected successfully');
  } catch (error) {
    let friendlyError = error.message;
    
    // Categorize error messages
    if (friendlyError.includes('Authentication failed') || friendlyError.includes('bad auth')) {
      friendlyError = 'Authentication failed (invalid credentials)';
    } else if (friendlyError.includes('ENOTFOUND') || friendlyError.includes('Server selection timed out') || friendlyError.includes('MongooseServerSelectionError')) {
      friendlyError = 'Network failure (cannot reach MongoDB Atlas cluster)';
    } else if (friendlyError.includes('Invalid scheme') || friendlyError.includes('must begin with')) {
      friendlyError = 'Invalid connection string format';
    }
    
    // Sanitize any potential leaked connection string from error
    friendlyError = friendlyError.replace(uri, safeUri);
    friendlyError = friendlyError.replace(/:([^:@]+)@/, ':****@');

    console.error('MongoDB connection failed:', friendlyError);
    process.exit(1);
  }
};

// Graceful shutdown helper
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination.');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error.message);
  }
};

// Listen to process events for termination
process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDB();
  process.exit(0);
});

module.exports = { connectDB, closeDB };


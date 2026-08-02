const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI is not defined in environment variables.');
    process.exit(1);
  }

  // Parse connection URI to hide password in logs if present
  let safeUri = uri;
  try {
    const parsed = new URL(uri);
    if (parsed.password) {
      parsed.password = '****';
    }
    safeUri = parsed.toString();
  } catch (e) {
    // If it's not a standard URL (e.g., standard replica set strings without protocol parsable by URL constructor),
    // we can attempt a basic regex replace or just state that we are connecting.
    safeUri = uri.replace(/:([^:@]+)@/, ':****@');
  }

  try {
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established successfully.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB connection disconnected.');
    });

    console.log(`Connecting to MongoDB at: ${safeUri}`);
    await mongoose.connect(uri);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
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

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const profileRoutes = require('./routes/profile.routes');
const companyRoutes = require('./routes/company.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const savedJobRoutes = require('./routes/savedJob.routes');
const notificationRoutes = require('./routes/notification.routes');
const adminRoutes = require('./routes/admin.routes');

// Import middlewares
const errorHandler = require('./middleware/error.middleware');
const AppError = require('./utils/AppError');

const app = express();

// 1. Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false // Allows static uploads to be retrieved in frontend
}));

// CORS Configuration
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:4200';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// Body Parser with limits (Security Step 16)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Sanitize inputs against MongoDB query injection
app.use(mongoSanitize());

// 2. Static uploads directory routing
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 3. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/saved-jobs', savedJobRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

// Health Check (Step 25)
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  return res.status(200).json({
    success: true,
    message: 'KarmSetu API is running',
    database: dbStatus,
  });
});

// 4. Handle 404 Route Not Found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 'ROUTE_NOT_FOUND', 404));
});

// 5. Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;

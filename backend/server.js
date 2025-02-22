const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const logger = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

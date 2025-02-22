const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB URI
    const conn = await mongoose.connect('mongodb://localhost:27017/safemind');
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); 
  }
};

module.exports = connectDB;

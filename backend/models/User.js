const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Other',
  },
  contact: {
    type: String,
    trim: true,
    maxlength: 15,
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  age: {
    type: Number,
    min: 1, 
    max: 120,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not a valid integer value for age.',
    },
  },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

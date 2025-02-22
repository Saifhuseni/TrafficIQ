const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { username, email, password, name, gender, contact, bio, age } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' }); // Ensures message is sent correctly
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword, 
      name,
      gender,
      contact,
      bio,
      age,
    });

    // Save user to database
    await user.save();

    // Generate JWT with user details in the payload
    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username,
        email,
        name,
        gender,
        contact,
        bio,
        age,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Generate JWT with user details in the payload
    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        gender: user.gender,
        contact: user.contact,
        bio: user.bio,
        age: user.age,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

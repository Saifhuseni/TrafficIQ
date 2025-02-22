const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

// POST /api/auth/register
router.post(
  '/register',
  [
    check('username', 'Username is required and must be between 3 to 25 characters')
      .isLength({ min: 3, max: 25 })
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('name', 'Full name is required and must not exceed 50 characters').isLength({ max: 50 }).not().isEmpty(),
    check('gender', 'Gender must be Male, Female, or Other').isIn(['Male', 'Female', 'Other']),
    check('contact', 'Contact must be a valid mobile number').optional().isMobilePhone(),
    check('bio', 'Bio must not exceed 200 characters').optional().isLength({ max: 200 }),
    check('age', 'Age must be a valid number between 1 and 120').optional().isInt({ min: 1, max: 120 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    registerUser(req, res);
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    loginUser(req, res);
  }
);

module.exports = router;

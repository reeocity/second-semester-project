const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post(
  '/signup',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  signup
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login
);

module.exports = router;
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.create = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      user: newUser,
      result: 'ok',
    });
  } catch (err) {
    console.err(err);
    next(err);
  }
};

exports.getToken = (req, res, next) => {
  try {
    const jwtToken = jwt.sign(req.user, JWT_SECRET, { expiresIn: '5d' });
    res.status(200).json({
      token: jwtToken,
      result: 'ok',
    });
  } catch (err) {
    console.err(err);
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const signInUser = await User.findById(req.authorizedUser._id, '-password');
    return res.status(200).json({
      signInUser,
      result: 'ok',
    });
  } catch (err) {
    console.err(err);
    next(err);
  }
};

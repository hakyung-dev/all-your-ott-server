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
    const user = await User.findById(
      req.authorizedUser._id,
      '_id name streaming'
    );
    return res.status(200).json({
      signInUser: { _id: user._id, name: user.name },
      streaming: user.streaming,
      result: 'ok',
    });
  } catch (err) {
    console.err(err);
    next(err);
  }
};

exports.addStreaming = async (req, res, next) => {
  try {
    const newService = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.user_id,
      {
        $push: {
          streaming: newService,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Add Streaming',
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.removeStreaming = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.user_id,
      {
        $pull: {
          streaming: { _id: req.body.streamingId },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Remove Streaming',
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

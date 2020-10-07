const User = require('../../models/User');
const bcrypt = require('bcrypt');

exports.signUpValidation = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({
        message: '이미 존재하는 계정입니다.',
      });
    }
    next();
  } catch (err) {
    console.err(err);
    next(err);
  }
};

exports.signInValidation = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!user) {
      return res.status(401).json({
        message: '이메일 혹은 비밀번호를 정확하게 입력하세요.',
      });
    }
    if (!isCorrectPassword) {
      return res.status(401).json({
        message: '이메일 혹은 비밀번호를 정확하게 입력하세요.',
      });
    } else {
      req.user = {
        _id: user._id,
      };
      next();
    }
  } catch (err) {
    console.err(err);
    next(err);
  }
};

exports.streamingAddValidation = async (req, res, next) => {
  const { service_name } = req.body;
  try {
    const subscribed = await User.findOne({
      'streaming.service_name': service_name,
    });

    if (subscribed) {
      return res.status(400).json({
        message: '이미 등록된 서비스입니다.',
      });
    }
    next();
  } catch (err) {
    console.err(err);
    next(err);
  }
};

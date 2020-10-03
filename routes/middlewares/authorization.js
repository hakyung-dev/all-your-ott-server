const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = async (req, res, next) => {
  const headerToken = req.headers.authorization;
  const bearer = headerToken.split(' ');
  const token = bearer[1];

  try {
    if (token === 'null') {
      return req.status(403).json({ error: '토큰 없음' });
    }
    jwt.verify(token, JWT_SECRET, (err, authorized) => {
      if (err) {
        return res.status(403).json({ error: '토큰 오류' });
      } else {
        req.authorizedUser = authorized;
      }
    });
    next();
  } catch (err) {
    console.err(err);
    next(err);
  }
};

const express = require('express');
const router = express.Router();

const usersController = require('./controllers/users.controller');
const {
  signUpValidation,
  signInValidation,
  streamingAddValidation,
} = require('./middlewares/userValidation');
const { verifyToken } = require('./middlewares/authorization');

router.post('/signup', signUpValidation, usersController.create);
router.post('/signin', signInValidation, usersController.getToken);
router.get('/', verifyToken, usersController.getUser);

router.put(
  '/:user_id/streaming/add',
  streamingAddValidation,
  usersController.addStreaming
);
router.put('/:user_id/streaming/remove', usersController.removeStreaming);

module.exports = router;

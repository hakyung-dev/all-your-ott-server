const express = require('express');
const router = express.Router();

const usersController = require('./controllers/users.controller');
const { signUpValidation, signInValidation } = require('./middlewares/userValidation');
const { verifyToken } = require('./middlewares/authorization');

router.post('/signup', signUpValidation, usersController.create);
router.post('/signin', signInValidation, usersController.getToken);
router.get('/', verifyToken, usersController.getUser);

module.exports = router;

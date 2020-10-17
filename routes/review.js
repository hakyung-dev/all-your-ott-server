const express = require('express');
const router = express.Router();

const reviewController = require('./controllers/review.controller');

router.put('/:user_id/new', reviewController.create);

module.exports = router;

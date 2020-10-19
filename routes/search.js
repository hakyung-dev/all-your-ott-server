const express = require('express');
const router = express.Router();

const searchController = require('./controllers/search.controller');

router.post('/content', searchController.getResult);

module.exports = router;

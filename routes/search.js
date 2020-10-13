const express = require('express');
const router = express.Router();

const searchController = require('./controllers/search.controller');

router.post('/movie', searchController.getResult);

module.exports = router;

const express = require('express');
const router = express.Router();

const searchController = require('./controllers/search.controller');

router.post('/content', searchController.getResult);
router.post('/genre', searchController.getGenre);
router.get('/detail/:type/:content_id', searchController.getDetail);

module.exports = router;

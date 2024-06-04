const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController');

router.post('/upload', dataController.uploadData);

router.get('/data', dataController.getData);

router.post('/process', dataController.processData);

module.exports = router;
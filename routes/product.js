const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/health', productController.getApiHealth);

module.exports = router;

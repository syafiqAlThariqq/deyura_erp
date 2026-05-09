const express = require('express');

const router = express.Router();

const productController = require('../controllers/product.controller');

const {
    authMiddleware,
    roleMiddleware
} = require('../middleware/auth.middleware');

router.get('/', productController.getProducts);

router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN', 'WAREHOUSE'),
    productController.createProduct
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('ADMIN'),
    productController.deleteProduct
);

module.exports = router;
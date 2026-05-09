const express = require('express');

const router = express.Router();

const stockController = require('../controllers/stock.controller');

router.get(
  '/',
  stockController.getMovements
);

router.post(
  '/adjustment',
  stockController.stockAdjustment
);

module.exports = router;
const express = require('express');
const router = express.Router();
const StockListStorage = require('./../../data/StockListStorage');

/**
 * Get all the stocks
 */
router.get('/all', (req, res, next) => {
    res.send(StockListStorage.getStockList());
});

/**
 * Get a specific stock
 */
router.get('/:stock_name', (req, res, next) => {
    res.send(StockListStorage.getStock(req.params.stock_name));
});

module.exports = router;

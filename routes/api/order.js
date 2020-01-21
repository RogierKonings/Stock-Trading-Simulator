const express = require('express');
const router = express.Router();
const Order = require('./../../model/Order');
const StockListStorage = require('./../../data/StockListStorage');
const UserStorage = require('./../../data/UserStorage');

/**
 * Buy or sell a specific amount of the given stock
 */
router.post('/:stock_name', (req, res, next) => {
    try {
        const targetStock = StockListStorage.getStock(req.params.stock_name);
        const user = UserStorage.getUser(req.body.user.name);
        const amount = parseInt(req.body.amount, 10);
        const order = new Order(targetStock, amount);

        if (req.body.action === 'BUY') {
            user.buyStock(order);
            res.end();
        } else if (req.body.action === 'SELL') {
            user.sellStock(order);
            res.end();
        } else {
            throw new Error('Please select action');
        }
    } catch (error) {
        throw error;
    }
});

module.exports = router;

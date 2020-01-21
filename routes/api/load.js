const express = require('express');
const router = express.Router();
const StockListGenerator = require('../../utilities/StockListGenerator').StockListGenerator;
const StockListStorage = require('./../../data/StockListStorage');
const UserStorage = require('./../../data/UserStorage');
const User = require('./../../model/User');

/**
 * Initializes the world
 */
router.post('/', (req, res, next) => {
    // Create a new list of given amount
    const stockList = new StockListGenerator(req.body.stocks);
    // Stores the list
    StockListStorage.setStockList(stockList);

    // Update the stock prices every 5 seconds from the back-end
    setInterval(() => {
        stockList.updateAllStocks(StockListStorage.getStockList());
    }, 5000);

    // Create a new user and store it
    const newUser = new User(req.body.user.name, req.body.user.balance);
    UserStorage.addUser(newUser);
    UserStorage.setCurrentUser(newUser);

    res.end();
});

module.exports = router;

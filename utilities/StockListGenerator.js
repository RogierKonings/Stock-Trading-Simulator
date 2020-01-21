const Stock = require('./../model/Stock');
const randomString = require('randomstring');
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NAME_LENGTH = 3;
const ERROR_MSG = 'The selected amount of companies is too high';

/**
 * Responsible for generating the stock list and updating the stocks every time period
 */
class StockListGenerator {
    /**
     * Generates a list of random stocks with random prices
     * 
     * @param {number} amount the amount of stocks that need to be generated 
     */
    constructor (amount) {
        this.stockList = [];

        let i = 0;
        const max = Math.min(amount, Math.pow(ALPHABET.length, NAME_LENGTH));
        if (amount > max) {
            // TODO: send status code
            throw new Error(ERROR_MSG);
        }
        while (i < max) {
            const randomStock = generateStock();
            if (!this.stockList.find(x => x.name === randomStock.getName())) {
                this.stockList.push(randomStock);
                i++;
            }
        }
    }

    /**
     * Updates the list of stocks with a randomly distributed increase/decrease
     * 
     * @param {array} list the current list of all the stocks 
     */
    updateAllStocks (list) {
        for (let i = 0; i < list.stockList.length; i++) {
            updateStock(list.stockList[i]);
        }
    };
}

/**
 * Generate a random name
 */
const generateRandomName = () => {
    return randomString.generate({
        length: NAME_LENGTH,
        charset: ALPHABET
    });
};

/**
 * 
 * Generate a random start price
 * 
 * @param {number} min the minimum number ex. 2
 * @param {number} max the maximum number ex. 200
 */
const generateRandomPreviousPrice = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generate a random percentage between -0.1% and 0.1%
 */
const generateRandomPercentage = () => {
    return Math.cos((Math.random() + 1) * Math.PI) / 1000;
};

/**
 * Generate the new price given a randomly generated percentage
 * The parseFloat conversion is necessary for float calculations ex. 10 * 1.001 = 10,00999998
 * 
 * @param {float} previousPrice the last price known
 * @param {float} percentage the increase/decrease of the price
 */
const generateNewPrice = (previousPrice, percentage) => {
    return parseFloat((previousPrice * (1 + percentage)).toPrecision(4));
};

/**
 * Creates a new Stock
 */
const generateStock = () => {
    const randomPercentage = generateRandomPercentage();
    const name = generateRandomName();
    const previousPrice = generateRandomPreviousPrice(2, 200);
    const currentPrice = generateNewPrice(previousPrice, randomPercentage);
    return new Stock(name, currentPrice, previousPrice);
};

/**
 * Updates the stock
 * 
 * @param {Stock} stock the stock that will be updated
 */
const updateStock = (stock) => {
    const currentPrice = stock.getCurrentPrice();
    const randomPercentage = generateRandomPercentage();
    const newPrice = currentPrice * (1 + randomPercentage);
    stock.setPreviousPrice(currentPrice);
    stock.setCurrentPrice(newPrice);
    stock.addPriceToHistory(currentPrice);
    return stock;
};

module.exports = {
    StockListGenerator: StockListGenerator,
    _private: {
        _generateRandomName: generateRandomName,
        _generateRandomPreviousPrice: generateRandomPreviousPrice,
        _generateRandomPercentage: generateRandomPercentage,
        _generateNewPrice: generateNewPrice,
        _generateStock: generateStock,
        _updateStock: updateStock
    }
};

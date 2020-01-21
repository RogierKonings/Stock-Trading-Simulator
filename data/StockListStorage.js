let currentStockList;
// If undefined, create a new empty stock list
if (currentStockList !== undefined) {
    currentStockList = [];
}
/**
 * Class responsible for storing the stocklist
 */
class StockListStorage {
    static setStockList (stockList) {
        currentStockList = stockList;
    };

    static getStockList () {
        return currentStockList;
    };

    static getStock (stockName) {
        for (let i = 0; i < currentStockList.stockList.length; i++) {
            if (currentStockList.stockList[i].getName() === stockName) {
                return currentStockList.stockList[i];
            }
        }
    };
}

module.exports = StockListStorage;

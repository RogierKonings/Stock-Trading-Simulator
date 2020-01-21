class Stock {
    constructor (name, currentPrice, previousPrice) {
        this.name = name;
        this.startPrice = currentPrice;
        this.currentPrice = currentPrice;
        this.previousPrice = previousPrice;
        this.priceHistory = [];
    }
    getName () {
        return `${this.name}`;
    }
    getCurrentPrice () {
        return this.currentPrice;
    }

    getStartPrice () {
        return this.startPrice;
    }

    setCurrentPrice (price) {
        this.currentPrice = price;
    }

    setPreviousPrice (price) {
        this.previousPrice = price;
    }

    /**
     * Adding the previous prices to an array
     * @param {float} price the previous price
     */
    addPriceToHistory (price) {
        this.priceHistory.push(price);
    }
}

module.exports = Stock;

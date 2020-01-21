class User {
    constructor (name, balance) {
        this.name = name;
        this.balance = balance;
        this.portfolio = [];
    }

    getName () {
        return this.name;
    }

    getBalance () {
        return this.balance;
    }

    setBalance (amount) {
        if (amount >= 0) {
            this.balance = amount;
            return true;
        }
        return false;
    }

    buyStock (order) {
        // Back-end input validation
        if (order.getAmount() <= 0) {
            throw new Error('the amount needs to be higher than 0');
        }
        const stock = order.getStock();
        const price = stock.getCurrentPrice();
        const currentBalance = this.getBalance();
        // user has enough balance
        if (currentBalance >= price * order.getAmount()) {
            // checks if the portfolio contains the stock
            const currentOrder = this.getOrder(stock);
            if (currentOrder) {
                // update the amount of stock and the balance
                currentOrder.addAmount(order.getAmount());
                this.setBalance(currentBalance - price * order.getAmount());
            } else {
                // add the stock to the portfolio and update the balance
                this.portfolio.push(order);
                this.setBalance(currentBalance - price * order.getAmount());
            }
        } else {
            throw new Error('not enough balance');
        }
    }

    sellStock (order) {
        // Back-end input validation
        if (order.getAmount() <= 0) {
            throw new Error('the amount needs to be higher than 0');
        }
        const stock = order.getStock();
        const price = stock.getCurrentPrice();
        const currentBalance = this.getBalance();
        const currentOrder = this.getOrder(stock);
        // checks if the portfolio contains the stock
        if (currentOrder) {
            // checks if stock will be completely sold
            if (currentOrder.getAmount() === order.getAmount()) {
                // remove the stock from the portfolio and update the balance
                this.removeOrder(stock);
                this.setBalance(currentBalance + price * order.getAmount());
            }
            else if (currentOrder.getAmount() > order.getAmount()) {
                // lower the owned amount of stock and update the portfolio
                currentOrder.setAmount(currentOrder.getAmount() - order.getAmount());
                this.setBalance(currentBalance + price * order.getAmount());
            } else {
                throw new Error('insufficient, you own ' + currentOrder.getAmount() + ' amount of the current stock');
            }
        } else {
            throw new Error('you do not own the current stock');
        }
        return false;
    }

    removeOrder (stock) {
        for (let i = 0; i < this.portfolio.length; i++) {
            if (this.portfolio[i].stock.getName() === stock.getName()) {
                this.portfolio.splice(i, 1);
            }
        }
    }

    getOrder (stock) {
        if (this.portfolio === 'undefined') {
            return false;
        } else {
            for (let i = 0; i < this.portfolio.length; i++) {
                if (this.portfolio[i].stock.getName() === stock.getName()) {
                    return this.portfolio[i];
                }
            }
        }
    }
    getPortfolio () {
        return this.portfolio;
    }
}

module.exports = User;

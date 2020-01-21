class Order {
    constructor (stock, amount) {
        this.stock = stock;
        this.amount = amount;
    }

    getStock () {
        return this.stock;
    }

    setStock (stock) {
        this.stock = stock;
    }

    getAmount () {
        return this.amount;
    }

    setAmount (value) {
        this.amount = value;
    }

    addAmount (value) {
        this.amount += value;
    }
}

module.exports = Order;

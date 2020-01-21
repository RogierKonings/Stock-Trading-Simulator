const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;
const assert = require('chai').assert;
const slg = require('./../../utilities/StockListGenerator');
const StockListGenerator = slg.StockListGenerator;

let spy = sinon.spy();

describe('StockListGenerator:', () => {

    describe('The constructor:', () => {
        it('should initialize an array on the instance', () => {
            let stockListGenerator = new StockListGenerator(10);
            expect(stockListGenerator.stockList).to.be.a('array');
        });
        it('should initialize an array of Objects', () => {
            let stockListGenerator = new StockListGenerator(10);
            expect(stockListGenerator.stockList[0]).to.be.an('object');
        });
        // Should generate a given amount of companies
        it('should initialize an array with a given amount', () => {
            let amount = 100;
            let stockListGenerator = new StockListGenerator(amount);
            expect(stockListGenerator.stockList.length).to.equal(amount);
        });
        // Cannot have more than 26^3 unique symbols
        it('should throw an error when the amount is larger than 26^3', () => {
            let amount = 17577;
            expect(() => new StockListGenerator(amount)).to.throw(Error, 'The selected amount of companies is too high')

        });
    });
    describe('The _private methods:', () => {
        // The company name should be three letters and unique
       describe('generateRandomName', () => {
          it('should be a string', () => {
              const result = slg._private._generateRandomName();
              expect(result).to.be.a('string');
          });
          it('should contain only three capital letters', () => {
              const result = slg._private._generateRandomName();
              expect(result).to.match(/[A-Z]{3}/);
          })
       });
       // The start price should be randomly distributed between 2 and 200
        describe('generateRandomPreviousPrice', () => {
            it('should be random price between 2 and 200', () => {
                const TEST_AMOUNT = 10000;
                const LOW_PRICE = 2;
                const HIGH_PRICE = 200;
                for (let index = 0; index < TEST_AMOUNT; index++) {
                    const result = slg._private._generateRandomPreviousPrice(LOW_PRICE, HIGH_PRICE);
                    assert.isAtLeast(result, LOW_PRICE);
                    assert.isAtMost(result, HIGH_PRICE);
                    assert.isAbove(result, LOW_PRICE-1);
                    assert.isBelow(result, HIGH_PRICE+1);
                }
            });

        });
        // The price randomly fluctuates between -0.1% and 0.1%
        describe('generateRandomPercentage', () => {
            it('should generate a random number between -0.001 and 0.001', () => {
                const TEST_AMOUNT = 10000;
                const LOW_PRICE = -0.001;
                const HIGH_PRICE = 0.001;

                for (let index = 0; index < TEST_AMOUNT; index++) {
                    const result = slg._private._generateRandomPercentage();
                    assert.isAtLeast(result, LOW_PRICE);
                    assert.isAtMost(result, HIGH_PRICE);
                    assert.isAbove(result, LOW_PRICE-0.001);
                    assert.isBelow(result, HIGH_PRICE+0.001);
                }
            });
        });
        describe('generateNewPrice', () => {
            it('should generate a new price increased or decreased by the percentage', () => {
                expect(slg._private._generateNewPrice(10, 0.001)).to.equal(10.01);
                expect(slg._private._generateNewPrice(10, 0)).to.equal(10.00);
                expect(slg._private._generateNewPrice(10, -0.001)).to.equal(9.99);
            });
        });
    });
});
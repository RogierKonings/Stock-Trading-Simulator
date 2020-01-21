let ngResource = require('angular-resource');

angular.module('stockServiceModule', ['ngResource'])

    .service('StockService', StockService);

function StockService ($resource) {
    return $resource('/stock/all', {}, {
        getStockList: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=UTF-8'}
        }
    });
}

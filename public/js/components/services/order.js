let ngResource = require('angular-resource');

angular.module('orderServiceModule', ['ngResource'])

    .service('OrderService', OrderService);

function OrderService ($resource) {
    return $resource('/order/:stock', {stock: '@stock'}, {
        changeStock: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }
    });
}

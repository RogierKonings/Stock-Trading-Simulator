const userServiceModule = require('./../../services/user');
const stockServiceModule = require('./../../services/stock');
const userDetailsDirectiveModule = require('./../../directives/details/user-details');
const navigationDirectiveModule = require('./../../directives/navigation/navigation');

angular.module('homeControllerModule', [
    'userServiceModule',
    'stockServiceModule',
    'userDetailsDirectiveModule',
    'navigationDirectiveModule'
])

    .controller('homeController', homeController);

function homeController ($rootScope, StockService, UserService) {
    let self = this;

    self.userData = UserService.getUserData({name: 'rogier'});

    self.loadList = () => {
        StockService.getStockList().$promise.then((data) => {
            self.stockList = data.stockList;
            self.userData = UserService.getUserData({name: 'rogier'});
            $rootScope.$broadcast('loadingStocks', self);
        });
    }

    setInterval(() => {
        self.loadList();
    }, 5000);
}

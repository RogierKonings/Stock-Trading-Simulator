import uiBootstrap from 'angular-ui-bootstrap';
import Chart from 'chart.js';

const orderServiceModule = require('./../../services/order');

angular.module('modalControllerModule', [uiBootstrap, 'orderServiceModule'])
    .controller('modalController', modalController)
    .controller('modalInstanceController', modalInstanceController);

function modalController ($uibModal) {
    // Set self to controller to avoid scoping issues
    let self = this;

    // Enable animations
    self.animationsEnabled = true;

    // Open the modal
    self.open = (stock) => {
        let modalInstance = $uibModal.open({
            animation: self.animationsEnabled,
            templateUrl: 'js/components/controllers//modal/modal.html',
            controller: 'modalInstanceController',
            controllerAs: 'modalInstanceCtrl',
            resolve: {
                stock: () => {
                    return stock;
                }
            }
        });

        modalInstance.result.then(function (result) {
            self.stock = result;
        });
    };
}

function modalInstanceController ($scope, $state, $document, stock, OrderService) {
    // Set self to controller to avoid scoping issues
    let self = this;

    // Update with initial value
    self.stock = stock;

    // Set local order information
    self.order = {
        amount: 1,
        action: null
    };

    /**
     * Update stock value
     */
    $scope.$on('loadingStocks', (event, data) => {
        const stockList = data.stockList;
        for (let i = 0; i < stockList.length; i++) {
            if (stockList[i].name === self.stock.name) {
                self.stock = stockList[i];
            }
        }
        self.initializeChart();
    });

    /**
     * Change the current position in a stock
     * 
     * @param {String} action BUY or SELL
     * @param {float} amount amount of stock to be sold
     */
    self.changePosition = (action, amount) => {
        OrderService.changeStock({stock: self.stock.name}, {
            user: {
                name: 'rogier'
            },
            action: action,
            amount: amount
        }).$promise.then(() => {
            $scope.$dismiss('cancel');
            $state.transitionTo('home.portfolio');
        }, (error) => {
            console.log(error);
        });
    };

    /**
     * Cancel the modal instance
     */
    self.cancel = () => {
        $scope.$dismiss('cancel');
    };

    /**
     * Initializes the chart with data
     */
    self.initializeChart = () => {
        let length = self.stock.priceHistory.length;
        let labelArr = [];
        for (let i = 0; i < length; i++) {
            labelArr.push(i);
        }
        let ctx = $document[0].getElementById('myChart');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labelArr,
                datasets: [{
                    label: 'Price History',
                    data: self.stock.priceHistory,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: {
                    duration: 0
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.yLabel;
                        }
                    }
                },
                scales: {
                 xAxes: [{
                    display: false
                    }]
                }
            }
        });
    }
}

const loadServiceModule = require('./../../services/load');

angular.module('loadControllerModule', [
    'loadServiceModule'
])

    .controller('loadController', loadController);

function loadController ($state, LoadService) {
    let self = this;

    self.goToHome = () => {
            const data = {
                user: {
                    name: 'rogier',
                    balance: self.balance
                },
            stocks: self.stocks
        };
        LoadService.initializeWorld(data).$promise.then(() => {
            $state.transitionTo('home.table');
        }, () => {
            throw new Error('could not initialize world');
        });
    };
}

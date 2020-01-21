import modalController from './../../controllers/modal/modal';

angular.module('portfolioDirectiveModule', ['modalControllerModule'])

    .directive('showPortfolio', () => {
        return {
            scope: {
                list: '='
            },
            restrict: 'EA',
            templateUrl: 'js/components/directives/portfolio/show-portfolio.html'
        };
    });

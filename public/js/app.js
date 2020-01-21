import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

const loadControllerModule = require('./components/controllers/load/load');
const homeControllerModule = require('./components/controllers/home/home');
const tableDirectiveModule = require('./components/directives/table/show-table');
const portfolioDirectiveModule = require('./components/directives/portfolio/show-portfolio');

angular
    .module('yexProject', [
        uiRouter,
        'loadControllerModule',
        'homeControllerModule',
        'tableDirectiveModule',
        'portfolioDirectiveModule'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('load', {
                url: '/',
                templateUrl: 'js/components/controllers/load/load.html',
                controller: 'loadController',
                controllerAs: 'loadController'
            })
            .state('home', {
                abstract: true,
                templateUrl: 'js/components/controllers/home/home.html',
                controller: 'homeController',
                controllerAs: 'homeController'
            })
            .state('home.table', {
                url: '/table',
                template: '<show-table list="homeController.stockList" search="homeController.search"/>'
            })
            .state('home.portfolio', {
                url: '/portfolio',
                template: '<show-portfolio list="homeController.userData.portfolio"/>'
            });
    });

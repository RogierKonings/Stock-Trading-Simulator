angular.module('userDetailsDirectiveModule', ['tableDirectiveModule'])

    .directive('userDetails', () => {
        return {
            scope: {
                name: '=',
                balance: '=',
                stock: '='
            },
            restrict: 'EA',
            templateUrl: 'js/components/directives/details/user-details.html'
        };
    });

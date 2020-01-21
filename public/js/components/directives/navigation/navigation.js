angular.module('navigationDirectiveModule', [])

    .directive('navigation', () => {
        return {
            scope: {
                name: '=',
                balance: '='
            },
            restrict: 'EA',
            transclude: true,
            templateUrl: 'js/components/directives/navigation/navigation.html',
            link: (iScope, iElem, iAttrs) => {
                iScope.selectedTab = 'table';
                iScope.selectTab = (tab) => {
                    iScope.selectedTab = tab;
                };
            }
        };
    });

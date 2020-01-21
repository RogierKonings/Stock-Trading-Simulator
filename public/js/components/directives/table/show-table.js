import modalControllerModule from './../../controllers/modal/modal';


angular.module('tableDirectiveModule', [
    'modalControllerModule'
    ])

    .directive('showTable', () => {
        return {
            scope: {
                list: '=',
                search: '='
            },
            restrict: 'EA',
            templateUrl: 'js/components/directives/table/show-table.html',
            link: (iScope, iElem, iAttrs) => {
                iScope.clickStock = (stock) => {
                    modalController.open(stock);
                };
            }
        };
    });

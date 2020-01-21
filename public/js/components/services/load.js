let ngResource = require('angular-resource');

angular.module('loadServiceModule', ['ngResource'])

    .service('LoadService', LoadService);

function LoadService ($resource) {
    return $resource('/load', {}, {
        initializeWorld: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }
    });
}

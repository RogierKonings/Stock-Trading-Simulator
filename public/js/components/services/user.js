let ngResource = require('angular-resource');

angular.module('userServiceModule', ['ngResource'])

    .service('UserService', UserService);

function UserService ($resource) {
    return $resource('/user/:name', {name: '@name'}, {
        getUserData: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }
    });
}

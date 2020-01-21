const io = require('socket.io-client');

angular.module('socketServiceModule', [])

    .service('SocketService', SocketService);
// Use when sockets are enabled
function SocketService ($rootScope) {
    let socket = io.connect();
    this.on = (eventName, callback) => {
        socket.on(eventName, function () {
            let args = arguments;
            $rootScope.$apply(function () {
                callback.apply(socket, args);
            });
        });
    };

    this.emit = (eventName, data, callback) => {
        socket.emit(eventName, data, function () {
            let args = arguments;
            $rootScope.$apply(() => {
                if (callback) {
                    callback.apply(socket, args);
                }
            });
        });
    };
}

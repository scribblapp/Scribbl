(function() {
    'use strict';

    // Authentication service for user variables
    angular
        .module('scribbl')
        .factory('Auth', Auth);

    Auth.$inject = ['$window'];

    function Auth($window) {
        var auth = {
            user: $window.user
        };

        return auth;
    };
})();

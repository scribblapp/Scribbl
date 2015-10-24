(function() {
    'use strict';

    // Authentication service for user variables
    angular
        .module('scribbl')
        .factory('Authentication', Authentication);

    function Authentication($window) {
        var auth = {
            user: $window.user
        };

        return auth;
    };

    Authentication.$inject = ['$window'];
});

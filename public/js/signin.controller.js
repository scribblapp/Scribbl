(function() {
    'use strict';
    
    angular
        .module('scribbl')
        .controller('SigninController', SigninController);

    function SigninController(Authentication, $http) {
        $http.post(
            '/signup', this.credentials
        ).then(function(res) {
            console.log(res);
        }).catch(function(err) {
            console.log(err);
        });

        $http.post(
            '/signin', this.credentials
        ).then(function(res) {
            console.log(res);
        }).catch(function(err) {
            console.log(err);
        });
    }

    SigninController.inject = ['Authentication', '$http'];
})();

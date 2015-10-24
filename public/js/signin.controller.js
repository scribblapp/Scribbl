(function() {
    'use strict';
    
    angular
        .module('scribbl')
        .controller('SigninController', SigninController);

    function SigninController($http) {
        $http.post(
            '/signup', this.credentials
        ).then(function(res) {
            console.log(res);
        }).catch(function(err) {
            console.log(err);
        });    
    }

    SigninController.inject = ['$http'];
})();

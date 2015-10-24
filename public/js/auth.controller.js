(function() {
    'use strict';
    
    angular
        .module('scribbl')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['Auth', '$http'];

    function AuthController(Auth, $http) {
        var vm = this;
        vm.authentication = Auth;
        
        vm.signup = function() {
            $http.post(
                '/signup', this.user
            ).then(function(res) {
                vm.authentication = res.data.user;
            }).catch(function(err) {
                vm.error = err.message;
            });
        };

        vm.signin = function() {
            $http.post(
                '/signin', this.user
            ).then(function(res) {
                vm.authentication = res.data.user;
            }).catch(function(err) {
                vm.error = err.data.message;
            });
        };
    }
})();

(function() {
    'use strict';
    
    angular
        .module('scribbl')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['Auth', '$http', '$location'];

    function AuthController(Auth, $http, $location) {
        var vm = this;
        vm.authentication = Auth;
        
        vm.signup = function() {
            $http.post(
                '/signup', this.user
            ).then(function(res) {
                vm.authentication = res.data.user;
                $location.path('/canvas');
            }).catch(function(err) {
                vm.error = err.message;
            });
        };

        vm.signin = function() {
            $http.post(
                '/signin', this.user
            ).then(function(res) {
                vm.authentication = res.data.user;
                $location.path('/canvas');
            }).catch(function(err) {
                vm.error = err.data.message;
            });
        };
    }
})();

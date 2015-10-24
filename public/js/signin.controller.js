(function() {
    'use strict';
    
    angular
        .module('scribbl')
        .controller('SigninController', SigninController);

    function SigninController(Authentication, $http) {
        var vm = this;
        vm.authentication = Authentication;
        
        vm.signup = function() {
            $http.post(
                '/signup', this.credentials
            ).then(function(res) {
                vm.authentication = res.data.user;
            }).catch(function(err) {
                console.log(err);
            });
        };

        vm.signin = function() {
            $http.post(
                '/signin', this.credentials
            ).then(function(res) {
                vm.authentication = res.data.user;
            }).catch(function(err) {
                console.log(err);
            });
        };
    }

    SigninController.inject = ['Authentication', '$http'];
})();

(function() {
    'use strict';
    angular
        .module('scribbl')
        .controller('SendController', SendController);

     SendController.$inject = ['$location', '$http'];
    
    function SendController($location, $http) {
        var vm = this;
        
        vm.getFriends = function() {
            $http.get('/friends').then(function(res) {
                vm.users = res.data;
            }).catch(function(err) {
                console.log(err);
            });
        };
    }
})();

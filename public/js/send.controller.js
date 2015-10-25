(function() {
    'use strict';
    angular
        .module('scribbl')
        .controller('SendController', SendController);

    SendController.$inject = ['$location', '$http', 'Image'];
    
    function SendController($location, $http, Image) {
        var vm = this;
        
        vm.getFriends = function() {
            $http.get('/friends').then(function(res) {
                vm.users = res.data;
            }).catch(function(err) {
                console.log(err);
            });
        };

        vm.sendImage = function() {
            console.log(Image.data);
        };
    }
})();

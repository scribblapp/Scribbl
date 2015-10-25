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
            var recipiants = _.filter(vm.users, function(user) {
                return user.shouldSend;
            });
            
            this.message.recipiants = recipiants; 
            this.message.image = Image.data;
            $http.post('message/send', this.message).then(function(res) {
                $location.path('/friends');
            }).catch(function(err) {
                console.log(err);
            });
        };
    }
})();

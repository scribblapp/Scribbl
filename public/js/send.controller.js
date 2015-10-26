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
                vm.users = vm.users.map(function(user) {
                    return { username: user };
                });
            }).catch(function(err) {
                console.log(err);
            });
        };

        vm.sendImage = function() {
            var recipients = _.filter(vm.users, function(user) {
                return user.shouldSend;
            });

            vm.message = {};
            vm.message.recipients = recipients; 

            console.log(Image.data.data);
            
            vm.message.image = "";
            for( var j = 0; j < Image.data.data.length; j++ ) {
                vm.message.image += String.fromCharCode(Image.data.data[j]);
            }

            vm.message.oldId = Image.oldId;
            vm.message.height = Image.data.height;
            vm.message.width = Image.data.width;

            Image.oldId = undefined;

            $http.post('/message/send', vm.message).then(function(res) {
                $location.path('/messages');
            }).catch(function(err) {
                console.log(err);
            });

            $location.path('/messages');
        };
    }
})();

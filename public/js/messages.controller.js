(function() {
    angular
        .module('scribbl')
        .controller('MessagesController', MessagesController);

    MessagesController.$inject = ['Auth', 'Image', '$http', '$location', '$state'];
    
    function MessagesController(Auth, Image, $http, $location, $state) {
        this.authentication = Auth;

        if (!this.authentication.user)
            $location.path('/');

        var vm = this;
        
        vm.getMessages = function() {
            $http.get('/messages').then(function(res) {
                vm.messages = res.data.reverse();
            }).catch(function(err) {
                console.log(err);
            });
        };

        vm.formatDate = function(date) {
            return moment(date).fromNow().replace('minutes', 'mins');
        };
        
        vm.drawResponse = function(message) {
            $http.get('/messages/' + message._id).then(function(res) {
                console.log(res.data);
                var ab = new Uint8ClampedArray(res.data.data.length);
                for( var j = 0; j < res.data.data.length; j++ ) {
                    ab[j] = res.data.data.charCodeAt(j);
                }
                
                Image.data = {};
                Image.oldId = res.data._id;
                Image.data.data = ab;
                Image.data.height = res.data.height;
                Image.data.width = res.data.width;
                Image.render = true;
                $location.path('/canvas');
            });
        };
    }
})();

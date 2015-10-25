(function() {
    angular
        .module('scribbl')
        .controller('MessagesController', MessagesController);

    MessagesController.$inject = ['$http', '$location'];
    
    function MessagesController($http, $location) {
        this.getMessages = function() {
            $http.get('/messages/app').then(function(res) {
                this.messages = res.data;
            }).catch(function(err) {
                console.log(err);
            });
        };
        
        this.drawRespose = function() {
            
        };
    }
})();

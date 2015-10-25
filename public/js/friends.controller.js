(function() {
    angular
        .module('scribbl')
        .controller('FriendsController', FriendsController);

    FriendsController.$inject = ['Auth', '$location', '$http'];
    
    function FriendsController(Auth, $location, $http) {
        this.authentication = Auth;

        if (!this.authentication.user)
            $location.path('/');
        
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

(function() {
    angular
        .module('scribbl')
        .controller('FriendsController', FriendsController);

    FriendsController.$inject = ['$location', '$http'];
    
    function FriendsController($location, $http) {
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

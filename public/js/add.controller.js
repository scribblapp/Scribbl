(function() {
    angular
        .module('scribbl')
        .controller('AddController', AddController);

    AddController.$inject = ['Auth', '$location', '$http'];
    
    function AddController(Auth, $location, $http) {
        this.authentication = Auth;

        if (!this.authentication.user)
            $location.path('/');

        var vm = this;

        vm.getUsers = function() {
            $http.get('/users').then(function(res) {
                vm.users = res.data;
            }).catch(function(err) {
                console.log(err);
            });
        };

        vm.addFriends = function() {
            var additions = _.filter(vm.users, function(user) {
                return user.shouldAdd;
            });

            console.log(additions);
            
            $http.post('/friends/add', additions).then(function(res) {
                $location.path('/friends');
            }).catch(function(err) {
                console.log(err);
            });
        };
    }
})();

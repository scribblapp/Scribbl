(function() {
    angular
        .module('scribbl')
        .controller('AddController', AddController);

    AddController.$inject = ['$location', '$http'];
    
    function AddController($location, $http) {
        var vm = this;

        vm.getUsers = function() {
            $http.get('/users').then(function(res) {
                vm.users = res.data;
            }).catch(function(err) {
                console.log(err);
            });
        };
    }
})();

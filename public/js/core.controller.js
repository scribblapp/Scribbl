(function() {
    'use strict';
    
    angular
        .module('scribbl')
        .controller('CoreController', CoreController);

    CoreController.inject = ['Auth', '$location'];

    function CoreController(Auth, $location) {
        this.authentication = Auth;
        if (this.authentication.user)
            $location.path('/canvas');
    }
})();

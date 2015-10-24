(function() {
    angular
        .module('scribbl')
        .controller('SideMenuCtrl', SideMenuCtrl);

    function SideMenuCtrl($timeout, $mdSidenav, $mdUtil, $log) {

        this.toggleLeft = buildToggler('left');

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 300);

            return debounceFn;
        }
    }

    SideMenuCtrl.$inject = ['$timeout', '$mdSidenav', '$mdUtil', '$log'];
})();

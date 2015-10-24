(function() {
    angular
        .module('scribbl')
        .controller('SideMenuController', SideMenuController);

    function SideMenuController($timeout, $mdSidenav, $mdUtil, $log) {

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

        this.close = function() {
            $mdSidenav('left').close()
                .then(function() {
                    $log.debug("close LEFT is done");
                });
            
        };
    }

    SideMenuController.$inject = ['$timeout', '$mdSidenav', '$mdUtil', '$log'];
})();

(function() {
    'use strict';
    
    angular
        .module('scribbl')
        .controller('CanvasController', CanvasController);

    CanvasController.inject = ['Auth', '$location', '$window', 'Image'];
    
    function CanvasController(Auth, $location, $window, Image) {
        this.authentication = Auth;

        if (!this.authentication.user)
            $location.path('/');
        
        var vm = this;
        vm.showColors = false;

        vm.width = $window.innerWidth;
        vm.height = $window.innerHeight - (($window.innerWidth > 600) ? 64 : 56);
        
        vm.toggleColors = function() {
            if (vm.showColors) {
                vm.showColors = false;
            } else {
                vm.showColors = true;
            }
        };

        var shit;
        
        vm.sendImage = function() { 
            Image.data = vm.ctx.getImageData(0, 0, vm.width, vm.height);
            // Set state params with image info
            $location.path('/send');
        };
    }
})();

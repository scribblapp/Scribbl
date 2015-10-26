(function() {
    'use strict';
    
    angular
        .module('scribbl')
        .controller('CanvasController', CanvasController);

    CanvasController.inject = ['Auth', '$location', '$window', 'Image'];
    
    function CanvasController(Auth, $location, $window, Image) {
        var vm = this;

        this.authentication = Auth;
        
        vm.ctx = undefined;
        
        if (!this.authentication.user)
            $location.path('/');
        
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

        vm.sendImage = function() { 
            Image.data = vm.ctx.getImageData(0, 0, vm.width, vm.height);
            console.log(Image.data);
            // Set state params with image info
            $location.path('/send');
        };

        vm.undo = function(){
            vm.version--;
        };
        
        if (Image.render) {
            var checkIfRendered = setInterval(function() {
                if (vm.ctx) {
                    clearInterval(checkIfRendered);
                    Image.render = false;
                    vm.ctx.putImageData(new ImageData(Image.data.data, Image.data.width, Image.data.height), 0, 0);
                }
            }, 100);
        }
    }
})();

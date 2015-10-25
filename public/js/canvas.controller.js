(function() {
    'use strict';
    
    angular
        .module('scribbl')
        .controller('CanvasController', CanvasController);

    CanvasController.inject = ['Auth', '$location', '$window', 'Image'];
    
    function CanvasController(Auth, $location, $window, Image) {
        this.authentication = Auth;
        
        var vm = this;

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

        var shit;
        
        vm.sendImage = function() { 
            Image.data = vm.ctx.getImageData(0, 0, vm.width, vm.height);
            console.log(Image.data);
            // Set state params with image info
            $location.path('/send');
        };

        if (Image.render) {
            var lol = setInterval(function() {
                if (vm.ctx) {
                    clearInterval(lol);
                    console.log(Image);
                    Image.render = false;
                    vm.ctx.putImageData(new ImageData(Image.data.data, Image.data.width, Image.data.height), 0, 0);
                }
            }, 100);
        }
    }
})();

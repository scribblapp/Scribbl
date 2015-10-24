(function() {
    'use strict';
    
    angular
        .module('scribbl')
        .controller('CanvasController', CanvasController);

    CanvasController.inject = [];
    
    function CanvasController() {
        var vm = this;
        vm.showColors = false;
        
        vm.toggleColors = function() {
            if (vm.showColors) {
                vm.showColors = false;
            } else {
                vm.showColors = true;
            }
        };
    }
})();

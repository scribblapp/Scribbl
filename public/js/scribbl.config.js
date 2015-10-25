(function() {
'use strict';

angular
    .module('scribbl')
    .config(ScribblConfig);

    ScribblConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    
    function ScribblConfig($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('!');

        // Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');
    
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "home.html"
            })
            .state('signin', {
                url: "/signin",
                templateUrl: "signin.html"
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "signup.html"
            })
            .state('canvas', {
                url: "/canvas",
                templateUrl: "canvas.html"
            })
            .state('friends', {
                url: "/friends",
                templateUrl: "friends.html"
            })
            .state('add', {
                url: "/add",
                templateUrl: "add.html"
            })
            .state('send', {
                url: "/send",
                templateUrl: "send.html"
            }).state('messages', {
                url: "/messages",
                templateUrl: "messages.html"
            });;
    }
})();

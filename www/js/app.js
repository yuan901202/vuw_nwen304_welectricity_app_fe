// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('welc', ['ionic', 'welc.controllers', 'welc.services', 'welc.directives'])

    .run(['$ionicPlatform', '$rootScope', '$state', function ($ionicPlatform, $rootScope, $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            $rootScope.$state = $state;
        });
    }])

    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('titlePage', {
                url: '/',
                templateUrl: 'templates/pages/titlePage.html',
                controller: 'TitlePageCtrl'
            })
            .state('gamePlay', {
                url: '/gamePlay',
                templateUrl: 'templates/pages/gamePlay.html',
                controller: 'GamePlayCtrl'
            })
    }]);

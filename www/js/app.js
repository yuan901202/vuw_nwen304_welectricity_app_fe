// Ionic Starter App

//Create our app wide modules
angular.module('welc.controllers', []);
angular.module('welc.services', []);
angular.module('welc.directives', []);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('welc', ['ionic', 'welc.controllers', 'welc.services', 'welc.directives', 'ngDragDrop'])
    .run(['$ionicPlatform', '$rootScope', '$state', 'GameService', 'saveLoadService',
        function ($ionicPlatform, $rootScope, $state, GameService, saveLoadService) {
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

            document.addEventListener("pause", saveGame, false);

            function saveGame() {
                var game = GameService.getGame();
                game.user_id = 1;   //TODO get this from a service

                //Save the game when the user exits
                $.ajax({
                    type: "POST",
                    url: "https://guarded-earth-8421.herokuapp.com/game",
                    data: game
                });
            }
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
            .state('cityView', {
                url: '/cityView',
                templateUrl: 'templates/pages/cityView.html',
                controller: 'CityViewCtrl'
            })
    }]);

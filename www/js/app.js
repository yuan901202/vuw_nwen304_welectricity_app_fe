// Ionic Starter App

//Create our app wide modules
angular.module('welc.controllers', []);
angular.module('welc.services', []);
angular.module('welc.directives', []);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('welc', ['ionic', 'welc.controllers', 'welc.services', 'welc.directives', 'ngDragDrop'])
    .run(['$ionicPlatform', '$rootScope', '$state', '$ionicLoading', '$timeout', 'GameService', 'saveLoadService',
        function ($ionicPlatform, $rootScope, $state, $ionicLoading, $timeout, GameService, saveLoadService) {
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

            $rootScope.$on('$stateChangeStart', function() {
                $ionicLoading.show({
                    template: 'Loading.....'
                });
            });

            $rootScope.$on('$stateChangeSuccess', function() {
                $timeout(function() {
                    $ionicLoading.hide();
                }, 500);
            });

            saveLoadService.loadGame().then(function(game) {
                if(game.status != 404) {
                    GameService.loadGame(game);
                }
            }, function() {
               console.log("Could not load game");
            });

            //Save the game when the user exits the application
            document.addEventListener("pause", saveGame, false);

            /**
             * This function will save the game.
             * Use an ajax request as ionic/ cordova will not allow $http on the pause event.
             */
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

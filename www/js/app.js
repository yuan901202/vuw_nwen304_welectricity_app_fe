// Ionic Starter App

//Create our app wide modules
angular.module('welc.controllers', []);
angular.module('welc.services', []);
angular.module('welc.directives', []);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('welc', ['ionic', 'welc.controllers', 'welc.services', 'welc.directives', 'ngDragDrop', 'ngCordova'])
    .run(['$ionicPlatform', '$rootScope', '$state', '$ionicLoading', '$timeout', 'GameService', 'saveLoadService', 'userInfoService', 'AuthService',
        function ($ionicPlatform, $rootScope, $state, $ionicLoading, $timeout, GameService, saveLoadService, userInfoService, AuthService) {
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

            $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState, fromStateParams) {
                if(toState.name !== 'Login' && !AuthService.loggedIn()) {
                    event.preventDefault();
                    $state.go('Login');
                    alert("Auth to: " + JSON.stringify(toState));
                }
                $ionicLoading.show({
                    template: 'Loading.....'
                });
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams, fromState, fromStateParams) {
                $timeout(function() {
                    $ionicLoading.hide();
                }, 500);
            });

            //Save the game when the user exits the application
            document.addEventListener("pause", saveGame, false);

            /**
             * This function will save the game.
             * Use an ajax request as ionic/ cordova will not allow $http on the pause event.
             */
            function saveGame() {
                var game = GameService.getGame();
                game.user_id = userInfoService.getUserId();

                //Save the game when the user exits
                $.ajax({
                    type: "POST",
                    url: "https://guarded-earth-8421.herokuapp.com/game",
                    data: game
                });
            }

            if(AuthService.loggedIn()) {
                saveLoadService.loadGame().then(function (game) {
                    GameService.loadGame(game.data);
                }, function () {
                    console.log("Could not load game");
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
            .state('Login', {
                url: '/login',
                templateUrl: 'templates/pages/Login.html',
                controller: 'LoginCtrl'
            })
            .state('Register', {
                url: '/register',
                templateUrl: 'templates/pages/SignUp.html',
                controller: 'SignUpCtrl'
            })
    }]);

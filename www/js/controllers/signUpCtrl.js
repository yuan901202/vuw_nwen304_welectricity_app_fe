/**
 * Created by John on 24/06/2015.
 */
angular.module('welc.controllers')
    .controller('SignUpCtrl', ['$scope', 'AuthService', '$ionicPopup', '$state', '$ionicLoading', function ($scope, AuthService, $ionicPopup, $state, $ionicLoading) {

        $scope.signUp = function (email, username, password) {
            $ionicLoading.show({
                template: 'Loading.....'
            });

            AuthService.register(email, username, password).then(function () {
                $state.go('titlePage');
                $ionicLoading.hide();
            }, function () {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Whoops something went wrong. Please try again later'
                });
            });
        };
    }]);
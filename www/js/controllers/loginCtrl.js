/**
 * Created by John on 24/06/2015.
 */
angular.module('welc.controllers')
    .controller('LoginCtrl', ['$scope', 'AuthService', '$ionicLoading', '$ionicPopup', function ($scope, AuthService, $ionicLoading, $ionicPopup) {

        $scope.login = function (username, password) {
            $ionicLoading.show({
                template: 'Loading.....'
            });

            AuthService.login(username, password).then(function () {
                $ionicLoading.hide();

            }, function () {
                $ionicLoading.hide();

                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Whoops something went wrong. Check your details and try again later'
                });
            });
        };
    }]);
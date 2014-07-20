angular.module('app').controller('apNavBarLoginCtrl', function ($scope, $http, apIdentity, apNotifier, apAuth, $location) {
    $scope.identity = apIdentity;
    $scope.signin = function (username, password) {
        apAuth.authenticateUser(username, password).then(function (success) {
            if (success) {
                apNotifier.notify('Login relizado com sucesso!');
            } else {
                apNotifier.notify('Usuario ou senha incorreto!');
            }
        });
    };

    $scope.signout = function () {
        apAuth.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            apNotifier.notify('Logou realizado com sucesso!');
            $location.path('/');
        })
    };
});
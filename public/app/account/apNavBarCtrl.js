angular.module('app').controller('apNavBarCtrl', function ($scope, $http, apIdentity, apNotifier, apAuth, $location) {
    $scope.identity = apIdentity;

    $scope.signin = function (username, password) {
        apAuth.authenticateUser(username, password).then(function (success) {
            if (success) {
                apNotifier.notify('Login relizado com sucesso!');
            } else {
                apNotifier.error('Usuário ou senha incorreto!');
            }
        });
    };

    $scope.signout = function () {
        apAuth.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            apNotifier.notify('Logout realizado com sucesso!');
            $location.path('/');
        })
    };
});
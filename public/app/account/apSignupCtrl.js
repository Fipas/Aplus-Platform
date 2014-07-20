angular.module('app').controller('apSignupCtrl', function ($scope, apUser, apNotifier, $location, apAuth) {
    $scope.signup = function () {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        apAuth.createUser(newUserData).then(function() {
            apNotifier.notify('Usuário criado com sucesso!');
            $location.path('/');
        }, function(reason) {
            apNotifier.error(reason.substr(reason.search(' ') + 1));
        });
    };


});
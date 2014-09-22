angular.module('app').controller('apSignupCtrl', function ($scope, apUser, apNotifier, $location, apAuth) {

    $scope.sex = 'male';
    $scope.access = 'student';

    $scope.signup = function () {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            passwordRepeat: $scope.passwordRepeat,
            firstName: $scope.fname,
            lastName: $scope.lname,
            sex: $scope.sex,
            birthday: $scope.birthday,
            country: $scope.country,
            state: $scope.state,
            city: $scope.city,
            access: $scope.access,
            institution: $scope.institution,
            department: $scope.department,
            webpageUrl: $scope.webpageUrl
        };

        apAuth.createUser(newUserData).then(function() {
            apNotifier.notify('Usuário criado com sucesso!');
            $location.path('/');
        }, function(reason) {
            apNotifier.error(reason.substr(reason.search(' ') + 1));
        });
    };


});
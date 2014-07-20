angular.module('app').controller('apProfileCtrl', function($scope, apAuth, apIdentity, apNotifier) {
    $scope.email = apIdentity.currentUser.username;
    $scope.fname = apIdentity.currentUser.firstName;
    $scope.lname = apIdentity.currentUser.lastName;

    $scope.update = function() {
        var newUserData = {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        }

        if ($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        apAuth.updateCurrentUser(newUserData).then(function() {
            apNotifier.notify('Seus dados foram atualizados');
        }, function(reason) {
            apNotifier.error(reason);
        })
    }
});
angular.module('app').controller('apUserListCtrl', function ($scope, apUser) {
    $scope.users = apUser.query();
});
angular.module('app').controller('apCreateClassCtrl', function ($scope, apClass, apNotifier, $location, apIdentity, apClassSvc, apAuth) {
    $scope.visible = true;

    $scope.createClass = function () {
        var newClassData = {
            owner: apIdentity.currentUser._id,
            teacherFirstName: apIdentity.currentUser.firstName,
            teacherLastName: apIdentity.currentUser.lastName,
            visible: $scope.visible,
            number: apClassSvc.getNextClassNumber(),
            collegeCourse: $scope.collegeCourse,
            courseName: $scope.courseName,
            term: $scope.term,
            institution: $scope.institution,
            department: $scope.department
        };

        console.log($scope.visible);

        apClassSvc.createClass(newClassData).then(function(data) {
            apNotifier.notify('Turma criada com sucesso!');
            $location.path('/classes');
        }, function(reason) {
            apNotifier.error(reason.substr(reason.search(' ') + 1));
        });
    };


});
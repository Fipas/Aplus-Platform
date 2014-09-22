angular.module('app').controller('apClassListCtrl', function ($scope, $resource, apClassSvc, apIdentity, apNotifier, $location, apClass) {

    $scope.classes = [];
    $scope.classesPending = [];
    $scope.classesSearched = [];
    $scope.identity = apIdentity;


    if (apIdentity.currentUser.isStudent()) {
        apClassSvc.getClassesByListId(apIdentity.currentUser.classesEntered).then(function(data) {
            $scope.classes = data;
        });

        apClassSvc.getClassesByListId(apIdentity.currentUser.classesEnteredPending).then(function(data) {
            $scope.classesPending = data;
        });
    } else {
        apClassSvc.getClassesByListId(apIdentity.currentUser.classesCreated).then(function(data) {
            $scope.classes = data;
        });
    }

    $scope.createNewClass = function() {
        if (apIdentity.currentUser.classesCreated.length === 5) {
            apNotifier.error("Não é possível criar mais de cinco turmas!");
        } else {
            $location.path('/create-class');
        }
    };

    $scope.searchClasses = function() {
         apClassSvc.getClassesByTeacherName($scope.teacherToSearch).then(function(data) {
             $scope.classesSearched = data;
         });
    };

    $scope.cancelClass = function(classToCancel) {
        apClassSvc.cancelClass(classToCancel, apIdentity.currentUser).then(function() {
            $scope.classesPending.splice($scope.classesPending.indexOf(classToCancel), 1);
            apNotifier.notify("Solicitação cancelada com sucesso!");
        }, function(reason) {
            apNotifier.error(reason);
        })
    }

    $scope.leaveClass = function(classToLeave) {
        apClassSvc.leaveClass(classToLeave, apIdentity.currentUser).then(function() {
            $scope.classes.splice($scope.classes.indexOf(classToLeave), 1);
            apNotifier.notify("Você saiu da turma!");
        }, function(reason) {
            apNotifier.error(reason);
        })
    }

    $scope.enterClass = function(classToEnter) {
        apClassSvc.addMemberToClass(classToEnter, apIdentity.currentUser).then(function() {
            $scope.classesPending.push(classToEnter);
            apNotifier.notify("Uma notificação foi enviada ao professor responsável pela turma!");
        }, function(reason) {
            apNotifier.error(reason);
        });
    };


});
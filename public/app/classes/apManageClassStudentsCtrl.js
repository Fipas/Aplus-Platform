angular.module('app').controller('apManageClassStudentsCtrl', function ($scope, apClass, apNotifier, $location, apUserSvc, $routeParams, apClassSvc) {

    $scope.classManaged = apClass.get({id: $routeParams.class}, function() {

    	if ($scope.classMembers === undefined) {
	        apUserSvc.getUsersByListId($scope.classManaged.members).then(function(data) {
	            $scope.classMembers = data;
	        });
	    }

	    if ($scope.pendingMembers === undefined) {

	        apUserSvc.getUsersByListId($scope.classManaged.pendingMembers).then(function(data) {
	            $scope.pendingMembers = data;
	        })
	    }
    });
    
    $scope.toggleCheckbox = function(list, checkbox) {
       
        angular.forEach(list, function(item) {
        	item.checked = checkbox;
        })
    }

    $scope.acceptMembersToClass = function() {
    	apClassSvc.acceptMembersToClass($scope.classManaged, $scope.pendingMembers).then(function(data) {

    		var newPendingMembers = [];

    		for (var i = 0; i < $scope.pendingMembers.length; i++) {
    			if ($scope.pendingMembers[i].checked) {
    				$scope.pendingMembers[i].checked = false;
    				$scope.classMembers.push($scope.pendingMembers[i]);
    			} else {
    				newPendingMembers.push($scope.pendingMembers[i]);
    			}
    		}

    		$scope.pendingMembers = newPendingMembers;



    		apNotifier.notify("O(s) estudante(s) foram) aceitos na turma!");
    	}, function(reason) {
    		apNotifier.error(reason);
    	})
    }



});
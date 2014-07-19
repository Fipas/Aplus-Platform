angular.module('app').controller('apNavBarLoginCtrl', function($scope, $http) {
   $scope.signIn = function(username, password) {
       $http.post('/login', {username: username, password: password}).then(function(response) {
           if (response.data.sucess) {
                console.log('logged in!');
           } else {
               console.log('failed to log');
           }
       });
   };
});
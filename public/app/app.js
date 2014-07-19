/**
 * Created by felipefonseca on 2014-07-19.
 */

angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
   $locationProvider.html5Mode(true);
   $routeProvider
       .when('/', { templateUrl: '/partials/main', controller: 'mainCtrl'});
});

angular.module('app').controller('mainCtrl', function($scope) {
   $scope.myVar = "Hello Angular!";
});
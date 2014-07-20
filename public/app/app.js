angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {auth: function (apAuth) {
            return apAuth.authorizeCurrentUserForRoute('admin')
        }},
        admin: {auth: function (apAuth) {
            return apAuth.authorizeAuthenticatedUserForRoute()
        }}
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'apMainCtrl'})
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
            controller: 'apUserListCtrl', resolve: routeRoleChecks.admin
        })
        .when('/signup', { templateUrl: '/partials/account/signup',
            controller: 'apSignupCtrl'})
        .when('/profile', { templateUrl: '/partials/account/profile',
            controller: 'apProfileCtrl', resolve: routeRoleChecks.user });

});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
})

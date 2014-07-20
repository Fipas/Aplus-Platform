angular.module('app').factory('apIdentity', function ($window, apUser) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new apUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
})
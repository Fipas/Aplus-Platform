angular.module('app').factory('apUser', function ($resource) {
    var UserResource = $resource('/api/users/:id', {_id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });

    UserResource.prototype.isAdmin = function () {
        return this.roles && this.roles.indexOf('admin') > -1;
    }

    UserResource.prototype.isStudent = function() {
        return this.roles && this.roles.indexOf('student') > -1;
    }

    return UserResource;
});
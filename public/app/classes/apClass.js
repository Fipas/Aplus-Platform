angular.module('app').factory('apClass', function ($resource) {
    var ClassResource = $resource('/api/classes/:id', {_id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });


    return ClassResource;
});
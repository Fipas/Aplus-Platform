angular.module('app').factory('apUserSvc', function ($q, apUser) {
    return {

        getUsersByListId: function (listId) {
            var promisses = [];
            var dfd = $q.defer();

            angular.forEach(listId, function (id) {
                promisses.push(apUser.get({id: id}));
            })

            $q.all(promisses).then(function () {
                dfd.resolve(promisses);
            })

            return dfd.promise;
        },

    }
});
angular.module('app').factory('apAuth', function ($http, apIdentity, $q, apUser) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    var user = new apUser();
                    angular.extend(user, response.data.user);
                    apIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },

        createUser: function (newUserData) {
            var newUser = new apUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function () {
                apIdentity.currentUser = newUser;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        updateCurrentUser: function (newUserData) {
            var dfd = $q.defer();

            var clone = angular.copy(apIdentity.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function() {
                apIdentity.currentUser = clone;
                dfd.resolve();
            }, function(reason) {
                dfd.reject(reponse.data.reason);
            });

            return dfd.promise;
        },

        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                apIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },

        authorizeCurrentUserForRoute: function (role) {
            if (apIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }

        },

        authorizeAuthenticatedUserForRoute: function () {
            if (apIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }
});
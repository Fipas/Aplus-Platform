angular.module('app').factory('apClassSvc', function ($q, apClass, apIdentity, $resource, apUser) {
    return {
        createClass: function (newClassData) {
            var newClass = new apClass(newClassData);
            var dfd = $q.defer();


            newClass.$save().then(function (data) {
                 apIdentity.currentUser.availableClassIds
                .splice(apIdentity.currentUser.availableClassIds
                .indexOf(newClassData.number), 1);

                apIdentity.currentUser.classesCreated.push(data.newClassId);

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        getNextClassNumber: function() {
            var availableNum = 1;
            var idList = apIdentity.currentUser.availableClassIds;

            while (idList.indexOf(availableNum) === -1 && availableNum <= 5)
                availableNum++;

            return availableNum;
        },

        getClassesByListId: function (listId) {
            var promisses = [];
            var dfd = $q.defer();

            angular.forEach(listId, function (id) {
                promisses.push(apClass.get({id: id}));
            })

            $q.all(promisses).then(function () {
                dfd.resolve(promisses);
            })

            return dfd.promise;
        },

        addMemberToClass: function(classToEnter, user) {
            var dfd = $q.defer();

            if (classToEnter.pendingMembers.indexOf(user._id) > -1) {
                dfd.reject("Autorização para entrar na turma já solicitada!");
                return dfd.promise;
            }

            if (classToEnter.members.indexOf(user._id) > -1) {
                dfd.reject("Você ja faz parte desta turma!");
                return dfd.promise;
            }

            var classClone = angular.copy(classToEnter);
            var userClone = angular.copy(user);

            angular.extend(classClone, classToEnter);
            angular.extend(userClone, user);

            classClone.pendingMembers.push(user._id);

            new apClass(classClone).$update().then(function() {
                userClone.classesEnteredPending.push(classClone._id);
                userClone.$update().then(function() {
                    classToEnter = classClone;
                    user = userClone;
                    dfd.resolve();
                }, function(reason) {
                    dfd.reject(reason);
                });
            }, function(reason) {
                dfd.reject(reason);
            });

            return dfd.promise;
        },

        cancelClass: function(classToCancel, user) {
            var dfd = $q.defer();

            var classClone = angular.copy(classToCancel);
            var userClone = angular.copy(user);

            angular.extend(classClone, classToCancel);
            angular.extend(userClone, user);

            classClone.pendingMembers.splice(classClone.pendingMembers.indexOf(user._id), 1);

            new apClass(classClone).$update().then(function() {
                userClone.classesEnteredPending.splice(userClone.classesEnteredPending.indexOf(
                    classClone._id), 1);
                userClone.$update().then(function() {
                    classToCancel = classClone;
                    user = userClone;
                    dfd.resolve();
                }, function(reason) {
                    dfd.reject(reason);
                });
            }, function(reason) {
                dfd.reject(reason);
            });

            return dfd.promise;
        },

        leaveClass: function(classToLeave, user) {
            var dfd = $q.defer();

            var classClone = angular.copy(classToLeave);
            var userClone = angular.copy(user);

            angular.extend(classClone, classToLeave);
            angular.extend(userClone, user);

            classClone.members.splice(classClone.members.indexOf(user._id), 1);

            new apClass(classClone).$update().then(function() {
                userClone.classesEntered.splice(userClone.classesEntered.indexOf(
                    classClone._id), 1);
                userClone.$update().then(function() {
                    classToLeave = classClone;
                    user = userClone;
                    dfd.resolve();
                }, function(reason) {
                    dfd.reject(reason);
                });
            }, function(reason) {
                dfd.reject(reason);
            });

            return dfd.promise;
        },

        acceptMembersToClass: function(classToAccept, members) {
            var dfd = $q.defer();
            var promisses = [];
            var addedMembers = [];

            var classClone = angular.copy(classToAccept);
            var membersClone = angular.copy(members);

            angular.extend(classClone, classToAccept);
            angular.extend(membersClone, members);

            angular.forEach(membersClone, function(member, index) {
                if (member.checked) {
                    member.classesEnteredPending.splice(member.classesEnteredPending.indexOf(classClone._id), 1);
                    member.classesEntered.push(classClone._id);
                    addedMembers.push(members);
                    classClone.pendingMembers.splice(classClone.pendingMembers.indexOf(member._id), 1);
                    classClone.members.push(member._id);

                    promisses.push(new apUser(member).$update().then(function() {}, function(reason) {
                        dfd.reject(reason);
                    }));
                }
            });

            $q.all(promisses).then(function() {
                new apClass(classClone).$update().then(function() {
                    classToAccept = classClone;
                    dfd.resolve(addedMembers);
                }, function(reason) {
                    dfd.reject(reason);
                })
            });

            return dfd.promise;
        },

        getClassesByTeacherName: function(teacherName) {
            var dfd = $q.defer();
            var tokens = undefined;
            var firstName = "";
            var lastName = "";

            if (teacherName) {
                tokens = teacherName.split();
                firstName = tokens[0];
                lastName = tokens[1] || firstName;
            } else {
                dfd.reject("É preciso digitar um nome antes de efetuar a busca!");
            }

            $resource('/api/classes/:teacherFirstName/:teacherLastName', {teacherFirstName: "@teacherFirstName",
                lastName: "@teacherLastName"}).query({teacherFirstName: firstName, teacherLastName: lastName}, function(data) {
                dfd.resolve(data);
            });

            return dfd.promise;
        }
    };
});
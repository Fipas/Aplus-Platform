var Class = require('mongoose').model('Class'),
    User = require('mongoose').model('User');

exports.getClass = function (req, res) {
    Class.findOne({_id: req.params.id}).exec(function (err, data) {
        console.log(data);
        res.send(data);
    })
};

exports.getClassesByTeacherName = function(req, res) {
    Class.find({ $or: [ {teacherFirstName: new RegExp(req.params.teacherFirstName, "i") },
        {teacherLastName: new RegExp(req.params.teacherLastName.toLowerCase(), "i") } ],
        visible: true })
        .exec(function(err, data) {
        res.send(data);
    });
};

exports.createClass = function (req, res, next) {
    var classData = req.body;

    if (classData.number >= 6) {
        var err = new Error('Não é possível criar mais de cinco turmas!');
        res.status(400);
        return res.send({reason: err.toString()});
    }


    Class.create(classData, function (err, classCreated) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Classe já registrada!');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }

        User.findOne({_id: classCreated.owner}).exec(function(err, userRetrieved) {
           if (err) {
               res.status(400);
               return res.send({reason: err.toString()});
           }

           userRetrieved.classesCreated.push(classCreated._id);
           userRetrieved.availableClassIds.splice(userRetrieved.availableClassIds.indexOf(classCreated.number), 1);

           userRetrieved.save(function(err) {
               if (err) {
                   res.status(400);
                   return res.send({reason: err.toString()});
               }

               return res.send({newClassId: classCreated._id});
           })


        });

    });
};

exports.updateClass = function (req, res) {
    var classUpdates = req.body;

    Class.findById(classUpdates._id, function(err, data) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }

        data.owner = classUpdates.owner || data.owner;
        data.teacherFirstName = classUpdates.teacherFirstName || data.teacherFirstName;
        data.teacherLastName = classUpdates.teacherLastName || data.teacherLastName;
        data.visible = classUpdates.visible || data.visible;
        data.number = classUpdates.number || data.number;
        data.collegeCourse = classUpdates.collegeCourse || data.collegeCourse;
        data.level = classUpdates.level || data.level;
        data.courseName = classUpdates.courseName || data.courseName;
        data.term = classUpdates.term || data.term;
        data.section = classUpdates.section || data.section;
        data.year = classUpdates.year || data.year;
        data.institution = classUpdates.institution || data.institution;
        data.department = classUpdates.department || data.department;
        data.members = classUpdates.members || data.members;
        data.pendingMembers = classUpdates.pendingMembers || data.pendingMembers;

        data.save(function (err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }

            res.send(data);
        });
    });
}

var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
    teacherFirstName: {type: String, required: '{PATH} os required!'},
    teacherLastName: {type: String, required: '{PATH} os required!'},
    visible: {type: Boolean, required: '{PATH} is required!'},
    number: {type: Number, required: '{PATH} is required!'},
    collegeCourse: {type: String},
    level: {type: String},
    courseName: {type: String},
    term: {type: String},
    section: {type: String},
    year: {type: Number},
    institution: {type: String},
    department: {type: String},
    members: [mongoose.Schema.Types.ObjectId],
    pendingMembers: [mongoose.Schema.Types.ObjectId]
});


var Class = mongoose.model('Class', classSchema);

function createDefaultClass() {
    Class.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Class.create({owner: "ae", visible: true, number: 1, teacherFirstName: 'bibi',
            teacherLastName: 'bobo'});
        }
    });
}

exports.createDefaultClass = createDefaultClass;



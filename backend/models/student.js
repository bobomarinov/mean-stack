var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
        },
    lastName: {
        type: String,
        required: true
        },
    // uniqNumber: {
    //     type: Number,
    //     required: true
    //     },
    facultyNumber: {
        type: Number,
        required: true
        },
    birthDate: {
        type: String,
        required: true
        }
});


var Student = mongoose.model('Student', studentSchema);

module.exports = Student;

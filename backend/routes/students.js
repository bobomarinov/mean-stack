var express = require('express');
var router = express.Router();
var Student = require('../models/student');

//allow cors
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});



// add new student
router.post('/', async (req, res) => {
    const student = new Student({
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        //uniqNumber: req.query.uniqNumber,
        facultyNumber: req.query.facultyNumber,
        birthDate: req.query.birthDate
    });
    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
        newStudent.save();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        //return json but rename field _id to id
        res.json(students.map(student => {
            return {
                uniqNumber: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                //uniqNumber: student.uniqNumber,
                facultyNumber: student.facultyNumber,
                birthDate: student.birthDate
            }
        }));

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get one student by id
router.get('/id', async (req, res) => {
    try {
        id = req.query.uniqNumber;
        const student = await Student.findById(id);
        //return json but rename field _id to uniqNumber
        res.json({
            uniqNumber: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            //uniqNumber: student.uniqNumber,
            facultyNumber: student.facultyNumber,
            birthDate: student.birthDate
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// search and get students by firstName use find method
router.get('/search', async (req, res) => {
    try {
        const firstNameQuery = req.query.firstName;
        const regex = new RegExp(firstNameQuery, 'i');
        const students = await Student.find({ firstName: regex });

        res.json(students.map(student => {
            return {
                uniqNumber: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                facultyNumber: student.facultyNumber,
                birthDate: student.birthDate
            };
        }));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// update student by id
// fields where no info is provided are not updated
// first check if student exists by id and if not return error
// if student exists update only provided fields
router.put('/edit', async (req, res) => {
    try {
        id = req.query.uniqNumber;
        const student = await Student.findById(id);
        if (student == null) {
            return res.status(404).json({ message: 'Cannot find student' });
        }
        if (req.query.firstName != null) {
            student.firstName = req.query.firstName;
        }
        if (req.query.lastName != null) {
            student.lastName = req.query.lastName;
        }
        if (req.query.facultyNumber != null) {
            student.facultyNumber = req.query.facultyNumber;
        }
        if (req.query.birthDate != null) {
            student.birthDate = req.query.birthDate;
        }
        await student.save();
        res.status(200).json({ message: 'Student updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// delete student by id
router.delete('/delete', async (req, res) => {
    try {
        id = req.query.uniqNumber;
        await Student.findByIdAndDelete(id);
        res.status(200).json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});       



module.exports = router;
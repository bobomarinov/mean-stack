var express = require('express');
var router = express.Router();
var Student = require('../models/student');

//allow cors
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
        fistNameQuery = req.query.firstName;
        const students = await Student.find({firstName: fistNameQuery});
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


// update student by id
// TODO: even if I provide non existing uniqNumber it returns 200 and message Student updated
router.put('/edit', async (req, res) => {
    try {
        if (req.query.uniqNumber != null) {
            id = req.query.uniqNumber;
            if (req.query.firstName != null) {
                try {
                    await Student.findByIdAndUpdate(id, {firstName: req.query.firstName});
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
            if (req.query.lastName != null) {
                try {
                    await Student.findByIdAndUpdate(id, {lastName: req.query.lastName});
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
            if (req.query.facultyNumber != null) {
                try {
                    await Student.findByIdAndUpdate(id, {facultyNumber: req.query.facultyNumber});
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
            if (req.query.birthDate != null) {
                try {
                    await Student.findByIdAndUpdate(id, {birthDate: req.query.birthDate});
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        } else {
            res.status(500).json({ message: 'Provide uniqNumber' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
    //     if (req.query.firstName != null) {
    //         await Student.findByIdAndUpdate(id, {firstName: req.query.firstName});
    //     }
    //     if (req.query.lastName != null) {
    //         await Student.findByIdAndUpdate(id, {lastName: req.query.lastName});
    //     }
    //     if (req.query.facultyNumber != null) {
    //         await Student.findByIdAndUpdate(id, {facultyNumber: req.query.facultyNumber});
    //     }
    //     if (req.query.birthDate != null) {
    //         await Student.findByIdAndUpdate(id, {birthDate: req.query.birthDate});
    //     }
    //     res.status(200).json({ message: 'Student updated' });
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
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
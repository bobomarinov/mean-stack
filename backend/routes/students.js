var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the Student API');
});

// GET all students
router.get('/all', function(req, res, next) {
    res.send('All students');
});

// GET a student by id
router.get('/:id', function(req, res, next) {
    res.send('Student with id: ' + req.params.id);
});

// POST a new student
router.post('/new', function(req, res, next) {
    res.send('New student');
});

// PUT an existing student
router.put('/update/:id', function(req, res, next) {
    res.send('Update student with id: ' + req.params.id);
});

// DELETE a student
router.delete('/delete/:id', function(req, res, next) {
    res.send('Delete student with id: ' + req.params.id);
});

module.exports = router;
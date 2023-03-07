var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the students API');
});

router.get('/get', function(req, res, next) {
    res.send('Get a student');
});

router.get('/list', function(req, res, next) {
    res.send('List of students');
});

router.get('/add', function(req, res, next) {
    res.send('Add a student');
});

router.get('/edit', function(req, res, next) {
    res.send('Edit a student');
});

router.get('/delete', function(req, res, next) {
    res.send('Delete a student');
});

module.exports = router;

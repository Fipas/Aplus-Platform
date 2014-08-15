var auth = require('./auth'),
    users = require('../controllers/users'),
    classes = require('../controllers/classes'),
    mongoose = require('mongoose');

module.exports = function (app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.get('/api/users/:id', auth.requiresApiLogin, users.getUser);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/classes/:teacherFirstName/:teacherLastName', auth.requiresApiLogin, classes.getClassesByTeacherName);
    app.get('/api/classes/:id', auth.requiresApiLogin, classes.getClass);
    app.post('/api/classes', auth.requiresRole('teacher'), classes.createClass);
    app.put('/api/classes', classes.updateClass);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.all("/api/*", function (req, res) {
       res.send(404);
    });


    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}
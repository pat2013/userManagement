var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds157320.mlab.com:57320/usermangement');

var port = process.env.PORT || 8888;

var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


router.route('/user')
    .post(function(req, res) {
        var user = new User(); // create a new instance of the user model
        user.fName = req.body.fName || 'John'; // set the users name (comes from the request)
        user.lName = req.body.lName || 'Doe';
        user.title = req.body.title || 'Mr';
        user.sex = req.body.sex || 'Male';
        user.age = req.body.age || '24';
        console.log(req.body);

        user.save(function(err, saved) {
            if (err)
                res.send(err);
            console.log(saved.id);
            var userId = saved.id;
            res.json({ userId });
        });
    })
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            if (users) res.json(users);
            else res.json("not found");
        });
    });

router.route('/user/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            if (user) res.json(user);
            else res.json("not found");
        });
    })
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            // Handle any possible database errors
            if (err) {
                res.status(500).send(err);
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.
                user.fName = req.body.fName || user.fName; // set the users name (comes from the request)
                user.lName = req.body.lName || user.lName;
                user.title = req.body.title || user.title;
                user.sex = req.body.sex || user.sex;
                user.age = req.body.age || user.age;

                // Save the updated document back to the database
                user.save(function(err, user) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.send(user);
                });
            }
        });
    })

.delete(function(req, res) {

    User.findByIdAndRemove(req.params.user_id, function(err, user) {
        var response = {
            message: "User successfully deleted",
            id: user._id
        };
        res.send(response);
    });


});

app.listen(port);
console.log('Magic happens on port ' + port);
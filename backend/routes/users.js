// need the express router because this is a route we're creating
const router = require('express').Router();

// require the model
// this is the mongoose model we created
let User = require('../models/user.model');

// this is the first route
// this is the first endpoint that handles incoming HTTP GET requests on the '/users' URL path
router.route('/').get((req, res) => {
    // this is a mongoose method that gets a list of all of the users from the MongoDB Atlas DB
    // .find() returns a promise, so the results are returned in a JSON format
    User.find()
        // res.json means that we are going to return something in JSON format, and we are returning
        // the users we got from the database
        .then(users => res.json(users))

        // if there is an error, then return status 400
        .catch(err => res.status(400).json('Error: ' + err));
});

// the second endpoint handles incoming HTTP POST requests
router.route('/add').post((req, res) => {
    // the new username is part of the request body, req.body.username is going to be assigned
    // to the username variable
    const username = req.body.username;

    // create a new instance of user using the username
    const newUser = new User({username});

    // new user is saved to the database with the .save() method
    newUser.save()
        // then return 'User added!' in JSON format
        .then(() => res.json('User added!'))

        // or else, return the error message
        .catch(err => res.status(400).json('Error: ' + err));
});

// standard statement for router files
// this exports the router
module.exports = router;
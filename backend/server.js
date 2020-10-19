// First, require all of the things we will need
const express = require('express');
const cors = require('cors');

// connect to MongoDB Atlas database
const mongoose = require('mongoose');

// this configures so we can have our environment variables in the
// .env file
require('dotenv').config();

// this is how we create our Express server
// 5000 is the port our server will be on
const app = express();
const port = process.env.PORT || 5000;

// this is our middleware
// the second line will allow us to parse our json
// our server will be sending and receiving json
app.use(cors());
app.use(express.json());

// this is our database uri, we get this from MongoDB Atlas dashboard
// for connection string to work, we have to set the ATLAS_URI environment (env) variable
// create a new file in backend folder called '.env' and store the connection string there
// make sure to replace <password> in the string with your MongoDB Atlas password
const uri = process.env.ATLAS_URI;
// then pass in our uri to mongoose.connect to start our connection
// useNewURLParser is added because the MongoDB Node.js driver rewrote the tool it uses
// to parse MongoDB connection strings, so they put the new connection string parser behind a flag
// this is similar for useCreateIndex, to deal with MongoDB deprecating the 'ensure index' function
// don't have to remember this, just put these things everytime to deal with updates to MongoDB
mongoose.connect(uri, { useNewURLParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// tell the server to use the files: ‘exercises.js’ and ‘users.js’
// we have to require the files and then use the files
// whenever someone goes to the root url, and then adds /exercise at the end
// it will load everything in the exercises router
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// this starts the server
// it starts listening on a certain port
// start the server by running 'nodemon server' in the terminal
app.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
});
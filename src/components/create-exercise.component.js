import React, { Component } from 'react';
import axios from 'axios';

// We will install a package for the date picker, using npm install react-datepicker
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercises extends Component {
    constructor(props) {
        // in JS classes, you need to always call super() when defining the
        // constructor of a subclass
        super(props);

        // need to make sure that when we say 'this' inside a method, we
        // know what it is referring to, and we want to refer it to this whole class
        // we are binding 'this' to each of these methods
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // set initial state of the component
        // states are essentially how you create variables in React
        // don't do let name = 'kyle'
        // whenever you update state, it will automatically update your page with the new values
        this.state = {
            // need properties of the state that will correspond to the field
            // of the MongoDB document
            username: '',
            description: '',
            duration: 0,
            date: new Date(),

            // need something just for this component called users
            // we have users because on our page there will be a dropdown menu where
            // you can select all of the users that are in the database
            users: []
        }
    }

    // add one final method
    // people filling out the form will select the user associated with the exercise
    // from a dropdown list
    // eventually the user list will come from the MongoDB database
    // for now, we will hard code a single user
    // this is a React lifecycle method
    // React will automatically call this right before anything displays on the page
    componentDidMount() {
        // set the state of our users array
        //this.setState({
            // eventually load this from DB
            //users: ['test user'],

            // the drop down menu will automatically have the first user in the
            // drop down selected, so we want the username to be set to that user
            // in the very beginning
            //username: 'test user'
        //})

        // everything above has been changed to:
        axios.get('http://localhost:3000/users/')
            .then(response => {
                // we want to check if there is a response
                if (response.data.length > 0) {
                    this.setState({
                        // data will be an array, and we will map the array
                        // so for each user in the array, we will return their username
                        users: response.data.map(user => user.username),
                        // set username to first user in the database
                        username: response.data[0].username
                    })
                }
            })
    }

    // add methods that can be used to update state properties
    // we will have a web form with a text box where someone enters their username
    // so whenever someone enters a username, it will call this function and
    // set the state
    onChangeUsername(e) {
        // always use the setState method
        // don't do this.state.username = 'new username'
        this.setState({
            // target is the text box, and value is the value of the text box
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    // this is different because we will use a library to make a calendar that
    // appears and you can click the date on the calendar
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    // ad a method to handle submit event on the form
    onSubmit(e) {
        // this will prevent the default HTML submit behaviour from taking place
        // instead, it will do what we define here
        e.preventDefault();

        // inside a single method you can create variables if they will only
        // be used within that method
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        // eventually this is where we submit the exercise to the database
        console.log(exercise);

        axios.post('http://localhost:3000/exercises/add', exercise)
            // make a promise: after it is posted, we'll take the response and do something with it
            .then(res => console.log(res.data));

        // after, take the person back to the homepage
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                            {
                                // .map allows us to return something from each element in an array
                                this.state.users.map(function(user) {
                                    // for each user in the array, return an option which is an option of the
                                    // select box
                                    // >{user} is the actual text that will appear, which is user in this case
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        // now, send the user data to backend endpoint
        // the endpoint is expecting a JSON object in the request body, and we do that by sending
        // the second argument
        axios.post('http://localhost:3000/users/add', user)
            // make a promise: after it is posted, we'll take the response and do something with it
            .then(res => console.log(res.data));

        // instead of going back to home page, keep user on this page so they can enter
        // multiple users at a time
        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
// most React components will start the same
import React, { Component } from 'react';

// import Link to let us link to different routes
import { Link } from 'react-router-dom';

// all components start like this
export default class Navbar extends Component {

    // all components have to render something
    render() {
        return (
            // this code is basically the navbar from the boostrap documentation
            // converted to work for our purposes
            // checkout boostrap documentation to check out styles
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ExcerTracker</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
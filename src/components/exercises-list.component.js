import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// our Exercise component
// this component is implemented as a functional React component
// a functional React component is different from a class component is the
// lack of state and lifecycle (componentDidMount) methods
// so if all you need to do is accept props and return JSX, you should use a
// functional component
// for most components, we have a separate file, but this component is small
// so we include it in here
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

// this is implemented as a class component
export default class ExercisesList extends Component {
    // start with a constructor to initialize state with empty exercises array
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        // initialize state
        this.state = {exercises: []};
    }

    // get list of exercises from database
    componentDidMount() {
        axios.get('http://localhost:3000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // id is the object id we will be deleting
    deleteExercise(id) {
        axios.delete('http://localhost:3000/exercises/'+id)
            .then(response => { console.log(response.data)});

        // we also have to delete the exercise from what's being displayed to the user
        // this is a table and there is a row for each exercise, and we want to delete that item
        // right from the table
        this.setState({
            // whenever the id of the exercise in the exercises array does not equal
            // the id we're deleting, we'll pass it back to the exercises array
            // where does _id come from? it shows up in the MongoDB dashboard, automatically created
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            // for ever element called currentexercise, it will return a component
            // this component is something we create
            // it is a row of the table
            // we pass in three props: the currentexercise, deleteExercise, and key
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
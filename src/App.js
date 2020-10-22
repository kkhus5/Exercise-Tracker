import React from 'react';
// import this to create a router element
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
      // Put everything we want to be used with the router inside a router element
      <Router>
          <div className="container">
              <Navbar />
                  <br/>
                  <Route path="/" exact component={ExercisesList} />
                  <Route path="/edit/:id" component={EditExercise} />
                  <Route path="/create" component={CreateExercise} />
                  <Route path="/user" component={CreateUser} />
          </div>
      </Router>
  );
}

export default App;

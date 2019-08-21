import React from 'react';
import { Router, Route, Switch } from "react-router";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addRecipeForm = this.addRecipeForm.bind(this);
  }

  addRecipeForm() {
    let AppFormSelection = document.getElementsByClassName('App')[0];
    AppFormSelection.appendChild
    console.log("Testing")
  }

  render() {
    return (
      <div className="App">
        <h1>Recipe Box</h1>
        <section>
          <button className="addItem" onClick={this.addRecipeForm}>Add Recipe</button>
        </section>
      </div>
    );
  }
}




export default App;

import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addRecipeForm = this.addRecipeForm.bind(this);
  }

  addRecipeForm() {  
 
    console.log("Testing")
  }

  render() {
    return (
      <div className="App">
        <h1>Recipe Box</h1>
        <section>
          <Link to="/add"><button className="addItem">Add Recipe</button></Link>
        </section>

        <hr />
      <Switch>
        <Route exact path="/" component={Home} />
          <Route path="/add" component={Add} />
      </Switch>
      </div>
    );
  }
}

function Home() {
  return (
    <div>Home</div>
  )
}

function Add() {
  return (
    <div>    
      <form>
        <legend>Add Recipe</legend>
        <label>Recipe Name</label>
        <input type="text" />
        <label>Ingredients</label>
        <textarea />
        <label>Instructions</label>
        <textarea />
        <label>Image URL (optional)</label>
        <input type="text" />
        <button>ADD RECIPE</button> 
      </form>
      <Link to={'/'}><button>Back to Home</button></Link>
    </div>
      )
}




export default App;

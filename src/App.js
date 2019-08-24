import React from 'react';
import mongoose from 'mongoose';
import { Link, Switch, Route } from 'react-router-dom'
import './App.css';




var uri = 'mongodb+srv://User1:User1@cluster0-pgooz.gcp.mongodb.net/RecipeList';

mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log("Database connection successful")
  } else {
    console.log("Database is not connected: " + err)
  }
})



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
      <form class="addrecipeform">
        <legend class="addrecipelegend">Add Recipe</legend>
        <label class="addrecipelabels">Recipe Name*</label><br/>
        <input type="text" class="addrecipename"/><br/>
        <label class="addrecipelabels">Ingredients*</label><br/>
        <textarea class="addrecipeingredients"/><br/>
        <label class="addrecipelabels">Instructions*</label><br/>
        <textarea class="addrecipeinstructions"/><br/>
        <label class="addrecipelabels">Image URL (optional)</label><br/>
        <input type="text" class="addrecipeimage"/><br/>
        <button>ADD RECIPE</button> 
      </form>
      <br />
      <Link to={'/'}><button>Back to Home</button></Link>
    </div>
      )
}




export default App;

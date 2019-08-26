import React from 'react';
import axios from 'axios';
import { Link, Switch, Route } from 'react-router-dom'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: 'not working'
    }

    this.addRecipeForm = this.addRecipeForm.bind(this);
  }

  /*  Boilerplate code to get express */
  componentDidMount() {
    axios.get(`https://localhost:5000/hello/app`)
      .then(res => {
        const persons = res.data;
        console.log("AXIOS testing: " + res.data)
        this.setState({ 
        response: persons
        });
      })
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
      <form className="addrecipeform">
        <legend className="addrecipelegend">Add Recipe</legend>
        <label className="addrecipelabels">Recipe Name*</label><br/>
        <input type="text" className="addrecipename"/><br/>
        <label className="addrecipelabels">Ingredients*</label><br/>
        <textarea className="addrecipeingredients"/><br/>
        <label className="addrecipelabels">Instructions*</label><br/>
        <textarea className="addrecipeinstructions"/><br/>
        <label className="addrecipelabels">Image URL (optional)</label><br/>
        <input type="text" className="addrecipeimage"/><br/>
        <button>ADD RECIPE</button> 
      </form>
      <br />
      <Link to={'/'}><button>Back to Home</button></Link>
    </div>
      )
}




export default App;

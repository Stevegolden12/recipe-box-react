/**********************************
 * ToDos:
 * Try to add click event for add on React-router (can I do that and how?)
 * 
 * 
 */


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


    this.showRecipesFromDB = this.showRecipesFromDB.bind(this);
  }

  /*  Boilerplate code to get express */
componentDidMount() { 

   this.showRecipesFromDB();

  }

  showRecipesFromDB() {
    axios.get(`http://localhost:5000/home/recipes`)
      .then(res => {
        const persons = JSON.stringify(res);
        console.log("AXIOS testing: " + persons)
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
          <Route exact path="/add" component={Add} />
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

class Add extends React.Component {
  constructor(props) {
    super(props)

    this.addRecipeToDB = this.addRecipeToDB.bind(this);
  }

  componentDidMount() {
   
  }

  addRecipeToDB(e) {
    e.preventDefault();
    const addRecipeInfo = document.getElementsByClassName('addRecipeInfo');   

    axios.post(`http://localhost:5000/add/recipe`, {
     recipeName: addRecipeInfo[0].value,
     recipeIngredients: addRecipeInfo[1].value,
     recipeInstructions: addRecipeInfo[2].value,
     recipeImg: addRecipeInfo[3].value,
    })
      .then((res)=> {    
        console.log(res.config.data)        
      })
      .catch((error)=> {
        console.log(error);
      });
     
  }

  render() {
    return (
      <div>
        <form className="addrecipeform">
          <legend className="addrecipelegend">Add Recipe</legend>
          <label className="addrecipelabels">Recipe Name*</label><br />
          <input type="text" className="addrecipename addRecipeInfo" /><br />
          <label className="addrecipelabels">Ingredients*</label><br />
          <textarea className="addrecipeingredients addRecipeInfo" /><br />
          <label className="addrecipelabels">Instructions*</label><br />
          <textarea className="addrecipeinstructions addRecipeInfo" /><br />
          <label className="addrecipelabels">Image URL (optional)</label><br />
          <input type="text" className="addrecipeimage addRecipeInfo" /><br />      
          <button onClick={(e)=>this.addRecipeToDB(e)}>ADD RECIPE</button>
        </form>
        <br />
        <Link to={'/'}><button>Back to Home</button></Link>
      </div>
    )
  }
}




export default App;

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
      recipe: [
        {       
          name: 'Test1'
        },
        { 
          name: 'Test2'
        }
      ]
    }


    this.showRecipesFromDB = this.showRecipesFromDB.bind(this);
  }

  /*  Boilerplate code to get express */
componentDidMount() { 

   this.showRecipesFromDB();

  }

 showRecipesFromDB() {
   axios.get(`http://localhost:8080/home/recipes`)
      .then(res => { 
        const allrecipes = (res.data)
        console.log("res.data.length: " + res.data.length)     
        if (res.data.length > 0) {
          this.setState({
            recipe: [...allrecipes]
          });
        }
     })

   console.log(this.state.recipe)
  }



  addRecipeForm() {  
 
    console.log("Testing")
  }

  render() {
    console.log(this.state.recipe)
    return (
      <div className="App">
        <h1>Recipe Box</h1>
        <section>
          <Link to="/add"><button className="addItem">Add Recipe</button></Link>
        </section>

        <hr />
        <Switch>
          {/*
          <Route exact path="/" component={Home} />
          */}
          <Route exact path="/" render={props =>
            (<Home {...props} recipes={this.state.recipe} />)
          } />
      
          <Route exact path="/add" component={Add} />
      </Switch>
      </div>
    );
  }
}

function Home(props) {

  return (
    <div>
      <div>Home</div>
      <div>{props.recipes[0].name}</div>
     </div>
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

    axios.post(`http://localhost:8080/add/recipes`, {
     recipeName: addRecipeInfo[0].value,
     recipeIngredients: addRecipeInfo[1].value,
     recipeInstructions: addRecipeInfo[2].value,
     recipeImg: addRecipeInfo[3].value,
    })
      .then((res) => {    
        console.log(res)
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

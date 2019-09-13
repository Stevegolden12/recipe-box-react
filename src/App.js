/**********************************
 * ToDos:
 * Try to add click event for add on React-router (can I do that and how?)
 * 
 * 
 */


import React from 'react';
import axios from 'axios';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

const initialState = {
  isGetDBRecipes: false,
}


const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
})

const mapDispatchToProps = {
  // ... normally is an object full of action creators
}

// `connect` returns a new function that accepts the component to wrap:
const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
)
// and that function returns the connected, wrapper component:
const ConnectedComponent = connectToStore(Component)


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
      ],
      isGetDatabaseRecipes: false,
    }



    this.showRecipesFromDB = this.showRecipesFromDB.bind(this);
    this.checkDatabaseRecipes = this.checkDatabaseRecipes.bind(this);
  }

  /*  Boilerplate code to get express */
  componentDidMount() { 
    this.showRecipesFromDB();


  }

  componentDidUpdate(prevProps, prevState) {
    console.log("checking CDU")
    
    console.log("isGetDatabaseRecipes: " + this.state.isGetDatabaseRecipes)
    console.log(prevState.isGetDatabaseRecipes)
    console.log(this.state.isGetDatabaseRecipes)
    if (this.state.isGetDatabaseRecipes === true) {
      this.showRecipesFromDB();
      this.setState({
        isGetDatabaseRecipes: false,
      })
    }

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



  checkDatabaseRecipes() {  
    console.log("checkDatabaseRecipes")
    this.setState({
      isGetDatabaseRecipes: true
    })
    this.forceUpdate();
    console.log("checkDatabaseRecipes change isGETDatabaseRecipes: " + this.state.isGetDatabaseRecipes)

  }

  render() {
    console.log(this.state.recipe)
    return (
      <div className="App">
        <h1>Recipe Box</h1>
        <section>
          <Link to="/add"><button className="addItem" onClick={this.checkDatabaseRecipes}>Add Recipe</button></Link>
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
          <Route exact path="/show" component={Show} />
          
      </Switch>
      </div>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);


  }


  render() {
    console.log(this.props.recipes)
    return (
      <div>
        <section className="index__recipesectionlayout">
          {this.props.recipes.map((recipes, index) => {
            
            return (
              <div key={`recipecardlayout${index}`} className="index__recipecardlayout">
                {recipes.url === '' && <div key={`noimageurl${index}`} className="index__noimagecard"></div>}
                {recipes.url !== '' ** <div key={`imageurl${index}`}>recipes.url</div>}
                <div key={`recipes.name${index}`} className="index__recipesnamecardlayout">{recipes.name}</div>
                <div key={`openrecipeswrapper${index}`}>
                  <Link to={{ pathname: '/show', state: { recipeName: recipes.name, recipeIngredients: recipes.ingredients, recipeInstructions: recipes.instructions, recipeURL: recipes.url, recipeID: recipes._id } }} ><input key={`openrecipes${index}`} type='button' value='OPEN RECIPE' /></Link>
                </div>
              </div>
            )
          })}
        </section>
      </div>
    )
  }
}

class Show extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      recipeName: '',
      recipeURL: '',
      recipeIngredients: '',
      recipeInstructions: '',
      recipeID: '',
    }

    this.editRecipeToDB = this.editRecipeToDB.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    this.setState({
      recipeName: this.props.location.state.recipeName,
      recipeURL: this.props.location.state.recipeURL,
      recipeIngredients: this.props.location.state.recipeIngredients,
      recipeInstructions: this.props.location.state.recipeInstructions,
      recipeID: this.props.location.state.recipeID,
    })
  }

  handleChange(e, stateName) {
    const sName = stateName;
    this.setState({
      [sName]: e.target.value
    })  
  }

  editRecipeToDB(e) {
    e.preventDefault();

    
    axios.post(`http://localhost:8080/show/editrecipes`, {
      recipeName: this.state.recipeName,
      recipeIngredients: this.state.recipeIngredients,
      recipeInstructions: this.state.recipeInstructions,
      recipeImg: this.state.recipeURL,
      recipeId: this.state.recipeID,   
    })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });
      

  }

  render() {
    
    return (
      <div>
        <form className="showrecipeform">
          <legend className="showrecipelegend"></legend>
          <label className="showrecipelabels"></label><br />
          <input type="text" className="showrecipename showrecipeinfo" value={this.state.recipeName} onChange={(e)=>this.handleChange(e, 'recipeName')} /><br />
          
          {this.state.recipeURL !== '' && <img src={'./img/' + `${this.state.recipeURL}`} />}       
        
          <label className="showrecipelabels">Image URL (optional)</label><br />
          {/*
          {this.props.location.state.recipeURL !== '' && <input type="text" className="showrecipeimage showRecipeInfo" value={this.state.recipeURL} onChange={(e)=>this.handleChange(e, 'recipeURL')/>}
           */}
          {this.state.recipeURL === '' && <input type="text" className="showrecipeimage showrecipeinfo" value={this.state.recipeURL} onChange={(e) => this.handleChange(e, 'recipeURL')} />} 
          <br /><br />
          <label className="showrecipelabels">Ingredients:</label><br /><br />
          <textarea className="showrecipeingredients showrecipeinfo" value={this.state.recipeIngredients} onChange={(e) => this.handleChange(e, 'recipeIngredients')} /><br />
          <label className="showrecipelabels">Instructions:</label><br /><br />
          <textarea className="showrecipeinstructions showrecipeinfo" value={this.state.recipeInstructions} onChange={(e) => this.handleChange(e, 'recipeInstructions')} /><br />

          <button onClick={(e) => this.editRecipeToDB(e)}>EDIT RECIPE</button>
        </form>
        <br />
        <Link to={'/'}><button>Back to Home</button></Link>
      </div>
      )
  }

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

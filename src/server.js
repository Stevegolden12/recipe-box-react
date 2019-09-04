const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
const app = express();
var host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')));



const mongoose = require('mongoose');

var uri = 'mongodb+srv://User1:User1@cluster0-pgooz.gcp.mongodb.net/RecipeList';

mongoose.connect(uri, { useNewUrlParser: true }, (err) => {

  if (!err) {
    console.log("Database connection successful")
  } else {
    console.log("Database is not connected: " + err)
  }
})

var Schema = mongoose.Schema;
var recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true
  },
  url: String,
});


var recipe = mongoose.model('recipes', recipeSchema);


app.get('/home/recipes/', (req, res) => {
  
  recipe.find({}, function (err, docs) {
    if (!err) {
      res.json(docs);
      process.exit();
    } else {
      throw err;
    }
  });


});

app.post('/add/recipes/', (req, res) => {
  //console.log("TESTING add/recipe")
  console.log("add/recipe post working")

 // console.log(req.body)  

  
  var newRecipe = new recipe({
    name: req.body.recipeName,
    ingredients: req.body.recipeIngredients,
    instructions: req.body.recipeInstructions,
    url: req.body.recipeImg,
  })

  newRecipe.save(newRecipe, function (err, issue) {

    if (err) {
      console.log("Issue could not be created")
    }
    else {
      res.send("Issue successfully created. <br> Issue id number is: " + issue._id)
    }
  });
 
});

app.listen(port, () => console.log(`Listening on port ${port}`));
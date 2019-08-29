const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'src')));
const mongoose = require('mongoose');

var uri = 'mongodb+srv://User1:User1@cluster0-pgooz.gcp.mongodb.net/RecipeList';

var Schema = mongoose.Schema;
var recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true
  },
  url: String,
});





app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log("Database connection successful")
  } else {
    console.log("Database is not connected: " + err)
  }
})

var recipe = mongoose.model('recipes', recipeSchema);

app.get('/home/recipes/', (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');

});

app.post('/add/recipe', (req, res) => {
  //console.log("TESTING add/recipe")
  console.log("add/recipe post working")

  console.log(req.body)
  
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
      console.log("Issue successfully created. <br> Issue id number is: " + issue._id)
    }
  });
 
});

app.listen(port, () => console.log(`Listening on port ${port}`));
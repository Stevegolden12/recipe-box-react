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

var recipe = mongoose.model('recipes', recipeSchema);



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


app.get('/home/recipes/', (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');

});

app.post('/add/recipe', (req, res) => {
  //console.log("TESTING add/recipe")
  res.send(200, { status: 'ok' })
  
 // res.send(
 //   `I received your POST request. This is what you sent me: ${req.body.post}`,
 // );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
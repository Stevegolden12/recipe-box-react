
import mongoose from 'mongoose';

var uri = 'mongodb+srv://User1:User1@cluster0-pgooz.gcp.mongodb.net/RecipeList';

var Schema = mongoose.Schema;
var recipeSchema = new Schema({
  name: String,
  ingredients: [String],
  instructions: [String],
  year: Number
});

var recipe = mongoose.model('recipes', recipeSchema);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {

  mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    if (!err) {
      console.log("Database connection successful")
    } else {
      console.log("Database is not connected: " + err)
    }
  })

  res.send("GET api/hello");

});

app.post('/api/world', (req, res) => {
  console.log("POST api/world")
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
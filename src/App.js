import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
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
      <form class="addrecipeform">
        <legend class="addrecipelegend">Add Recipe</legend>
        <label class="addrecipelabels">Recipe Name*</label><br/>
        <input type="text" class="addrecipename"/><br/>
        <label class="addrecipelabels">Ingredients*</label><br/>
        <textarea class="addrecipeingredients"/><br/>
        <label class="addrecipelabels">Instructions*</label><br/>
        <textarea class="addrecipeinstructions"/><br/>
        <label class="addrecipelabels">Image URL (optional)</label><br />   
        <div>
        <Accept />
        </div>
        <button>ADD RECIPE</button> 
      </form>
      <br />
      <Link to={'/'}><button>Back to Home</button></Link>
    </div>
      )
}

function Accept(props) {
  const { acceptedFiles, rejectedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png'
  });

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone  addrecipeimage' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>
          {acceptedFilesItems}
        </ul>
        <h4>Rejected files</h4>
        <ul>
          {rejectedFilesItems}
        </ul>
      </aside>
    </section>
 
  );
}


export default App;

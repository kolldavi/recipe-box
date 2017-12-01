import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Recipe extends Component {
  render() {
    const { title, list, displayed } = this.props;
    return (
      <div className="Main">
        <p>{title}</p>
        <ol>{list.map(item => <li>{item}</li>)}</ol>
      </div>
    );
  }
}

class App extends Component {
  state = {
    recipeList: [{ title: 'added', list: [1, 2] }]
  };
  addRecipe = recipe => {
    let newList = this.state.recipeList.concat(recipe);
    this.setState({
      recipeList: newList
    });
    console.log(this.state);
  };
  componentDidMount() {
    console.log(this.state);
  }

  render() {
    const { recipeList } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Box</h1>
        </header>
        {recipeList.map(recipe => (
          <Recipe
            key={recipe.title}
            title={recipe.title}
            list={recipe.list}
            displayed={false}
          />
        ))}

        <button onClick={() => this.addRecipe({ title: 'new', list: [5, 6] })}>
          addRecipe
        </button>
      </div>
    );
  }
}

export default App;

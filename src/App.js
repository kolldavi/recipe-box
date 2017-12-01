import React, { Component } from 'react';
import './css/styles.css';
const uuid = require('uuid');
class Recipe extends Component {
  state = {
    isCollapsed: true
  };

  toggleClass = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };
  render() {
    const { title, ingredients, removeRecipe, id, editRecipe } = this.props;

    const { isCollapsed } = this.state;
    return (
      <div className="container">
        <div className="accordion" onClick={this.toggleClass}>
          <h3>{title}</h3>
        </div>
        <div className={isCollapsed ? 'hide' : 'expand'}>
          <h4 className="ingredients">Ingredients</h4>
          <hr />
          <ol>
            {ingredients.map((item, value) => <li key={value}>{item}</li>)}
          </ol>
          <button className="btn btnDelete" onClick={() => removeRecipe(id)}>
            delete
          </button>
          <button
            className="btn btnEdit"
            onClick={() => editRecipe(id, 'title', ingredients)}>
            edit
          </button>
        </div>
      </div>
    );
  }
}

class App extends Component {
  state = {
    recipeList: [
      {
        id: uuid.v4(),
        title: 'Dinner',
        ingredients: ['chicken', 'broccoli']
      }
    ]
  };
  addRecipe = recipe => {
    let newList = this.state.recipeList.concat(recipe);
    this.setState({
      recipeList: newList
    });
  };
  removeRecipe = id => {
    let newList = this.state.recipeList.filter(recipe => recipe.id !== id);

    this.setState({ recipeList: newList });
  };

  editRecipe = (id, title, recipe) => {
    let updatedRecipe = this.state.recipeList.map(item => {
      if (item.id === id) {
        item.title = title;
        item.recipe = recipe;
      }
      return item;
    });
    this.setState(updatedRecipe);
  };
  render() {
    const { recipeList } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="heading-primary">Recipe Box</h1>
        </header>
        <div className="list-container">
          <button
            className="btn"
            onClick={() =>
              this.addRecipe({
                id: uuid.v4(),
                title: 'Breakfast',
                ingredients: ['bacon', 'eggs', 'ham']
              })
            }>
            add new recipe
          </button>
          {recipeList.map(recipe => (
            <Recipe
              className="accordionItem"
              id={recipe.id}
              key={recipe.id}
              title={recipe.title}
              ingredients={recipe.ingredients}
              removeRecipe={this.removeRecipe}
              editRecipe={this.editRecipe}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;

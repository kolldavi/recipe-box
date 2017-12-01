import React, { Component } from 'react';

import './css/src/css/styles.css';

class Recipe extends Component {
  state = {
    isCollapsed: true
  };

  toggleClass = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };
  render() {
    const { title, ingredients, removeRecipe } = this.props;
    console.log(removeRecipe);

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
          <button className="btn btnDelete" onClick={() => removeRecipe(title)}>
            delete
          </button>
          <button className="btn btnEdit">edit</button>
        </div>
      </div>
    );
  }
}

class App extends Component {
  state = {
    recipeList: [
      {
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
    console.log(this.state);
  };
  removeRecipe = title => {
    let newList = this.state.recipeList.filter(
      recipe => recipe.title !== title
    );

    this.setState({ recipeList: newList });
  };
  ComponentDidUpdate() {
    console.log('update', this.state);
  }
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
                title: 'Breakfast',
                ingredients: ['bacon', 'eggs', 'ham']
              })
            }>
            add new recipe
          </button>
          {recipeList.map(recipe => (
            <Recipe
              className="accordionItem"
              key={recipe.title}
              title={recipe.title}
              ingredients={recipe.ingredients}
              removeRecipe={this.removeRecipe}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;

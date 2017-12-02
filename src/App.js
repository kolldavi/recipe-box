import React, { Component } from 'react';
import './css/styles.css';
import ReactModal from 'react-modal';
import TextField from 'material-ui/TextField';
const uuid = require('uuid');
class Recipe extends Component {
  state = {
    isCollapsed: true,
    displayModal: false,
    newTitle: '',
    newIngrediants: ''
  };
  componentDidMount() {
    this.setState({
      newTitle: this.props.title,
      newIngrediants: this.props.ingredients.toString()
    });
  }
  handleChangeTitle = event => {
    this.setState({ newTitle: event.target.value });
  };

  toggleModal = () => {
    //editRecipe(id, 'title', ingredients)}
    if (this.state.displayModal) {
      this.setState({ displayModal: false });
    } else {
      this.setState({ displayModal: true });
    }
  };
  toggleClass = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };
  render() {
    const { title, ingredients, removeRecipe, id, editRecipe } = this.props;

    const { isCollapsed } = this.state;
    return (
      <div className="">
        <div className="accordion " onClick={this.toggleClass}>
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
          <button className="btn btnEdit" onClick={() => this.toggleModal()}>
            edit
          </button>
        </div>
        <Modal
          title={title}
          id={id}
          ingredients={ingredients}
          method={editRecipe}
          isOpen={this.state.displayModal}
          onRequestClose={this.toggleModal}
        />
      </div>
    );
  }
}
class Modal extends Component {
  state = {
    newTitle: '',
    newIngrediants: ''
  };
  handleChangeTitle = event => {
    this.setState({ newTitle: event.target.value });
  };
  handleChangeIgrediants = event => {
    this.setState({ newIngrediants: event.target.value });
  };
  componentWillMount() {
    ReactModal.setAppElement('body');
  }
  componentDidMount() {
    this.setState({
      newTitle: this.props.title,
      newIngrediants: this.props.ingredients.toString()
    });
  }
  toggleModal = () => {
    //editRecipe(id, 'title', ingredients)}
    if (this.state.displayModal) {
      this.setState({ displayModal: false });
    } else {
      this.setState({ displayModal: true });
    }
  };
  render() {
    const {
      title,
      ingredients,
      id,
      method,
      isOpen,
      onRequestClose
    } = this.props;

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal">
        <div>
          <h1>{title === 'title' ? 'Add' : 'Edit'} Recipe</h1>
          <TextField
            onChange={this.handleChangeTitle}
            defaultValue={title}
            floatingLabelText="Title"
          />
          <br />
          <TextField
            defaultValue={ingredients.toString()}
            onChange={this.handleChangeIgrediants}
            floatingLabelText="Ingredients"
          />
          <br />
          <button
            className="btn btnEdit"
            onClick={() => {
              let recipe = this.state.newIngrediants.split(',');
              method(id, this.state.newTitle, recipe);
              onRequestClose();
            }}>
            {title === 'title' ? 'Add' : 'Update'}
          </button>
          <button className="btn" onClick={() => onRequestClose()}>
            Cancel
          </button>
        </div>
      </ReactModal>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    const storedRecipe = localStorage.getItem('recipe_box');
    var data;
    if (storedRecipe) {
      data = JSON.parse(storedRecipe);
    } else {
      data = [
        {
          id: uuid.v4(),
          title: 'Egg McMuffin',
          ingredients: ['eggs', 'cheese', 'english muffin', 'sausage']
        },
        {
          id: uuid.v4(),
          title: 'healthy chicken',
          ingredients: ['chicken', 'broccoli', 'rice']
        }
      ];
    }
    this.state = {
      recipeList: data,
      displayModal: false
    };
  }
  componentDidUpdate() {
    this.saveToLocal();
  }
  saveToLocal() {
    localStorage.setItem('recipe_box', JSON.stringify(this.state.recipeList));
  }
  toggleModal = () => {
    //editRecipe(id, 'title', ingredients)}
    if (this.state.displayModal) {
      this.setState({ displayModal: false });
    } else {
      this.setState({ displayModal: true });
    }
  };
  addRecipe = (id, title, ingredients) => {
    let newList = this.state.recipeList.concat({ id, title, ingredients });
    this.setState({
      recipeList: newList
    });
  };
  removeRecipe = id => {
    let newList = this.state.recipeList.filter(recipe => recipe.id !== id);

    this.setState({ recipeList: newList });
  };

  editRecipe = (id, title, ingredients) => {
    let updatedRecipe = this.state.recipeList.map(item => {
      if (item.id === id) {
        item.title = title;
        item.ingredients = ingredients;
      }
      return item;
    });
    this.setState(updatedRecipe);
  };
  render() {
    const { recipeList } = this.state;
    return (
      <div className="wrapper">
        <header>
          <h1 className="heading-primary">Recipe Box</h1>
        </header>
        <div className="content">
          <button className="btn" onClick={() => this.toggleModal()}>
            add new recipe
          </button>
          <div className="listing">
            {recipeList.map(recipe => (
              <Recipe
                className="content accordion"
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
        <Modal
          title={'title'}
          id={uuid.v4()}
          ingredients={'ingredients'}
          method={this.addRecipe}
          isOpen={this.state.displayModal}
          onRequestClose={this.toggleModal}
        />
      </div>
    );
  }
}

export default App;

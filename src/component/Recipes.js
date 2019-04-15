import React, {Component} from 'react';
import axios from 'axios';
import DisplayRecipe from './DisplayRecipe';


export default class Recipe extends Component {
    constructor() {
        super()

        this.state = {
            recipes: [],

            food: ``,
            foodUpdate: ``,
            foodDelete: ``,
            foodSearch: ``,

            ingredients: ``,
            ingredientsUpdate: ``,

            instructions: ``,
            instructionsUpdate: ``
        }

        this.handleFood = this.handleFood.bind(this);
        this.handleUpdateFood = this.handleUpdateFood.bind(this);
        this.handleDeleteFood = this.handleDeleteFood.bind(this);
        this.searchFood = this.searchFood.bind(this);

        this.handleIngredients = this.handleIngredients.bind(this);
        this.handleIngredientsUpdate = this.handleIngredientsUpdate.bind(this);

        this.handleInstructions = this.handleInstructions.bind(this);
        this.handleInstructionsUpdate = this.handleInstructionsUpdate.bind(this);
    }

    handleFood(event) {
      this.setState({food: event.target.value})
    }

    handleUpdateFood(event) {
      this.setState({foodUpdate: event.target.value})
    }

    handleDeleteFood(event) {
      this.setState({foodDelete: event.target.value})
    }

    searchFood(event) {
      this.setState({foodSearch: event.target.value})
    }


    handleIngredients(event) {
      this.setState({ingredients: event.target.value});
    }

    handleIngredientsUpdate(event) {
      this.setState({ingredientsUpdate: event.target.value});
    }


    handleInstructions(event) {
      this.setState({instructions: event.target.value})
    }

    handleInstructionsUpdate(event) {
      this.setState({instructionsUpdate: event.target.value})
    }



  componentDidMount() {
    axios.get(`/api/VietRecipes`).then(res => {
      this.setState({recipes: res.data})
    });
  }

  createRecipe(food, ingredients, instructions) {
    axios.post('/api/VietRecipe', {food, ingredients, instructions}).then((res) => {
      this.setState({
        recipes: res.data,
        food: '',
        ingredients: ``,
        instructions: ``
      });
    });
  }

  deleteRecipe() {
    const food = this.state.foodDelete;
    axios.delete(`/api/VietRecipe/${food}`).then(res => {
      this.setState({recipes: res.data});
    });
  }

  updateRecipe() {
    const food = this.state.foodUpdate;
    const ingredients = this.state.ingredientsUpdate;
    const instructions = this.state.instructionsUpdate;
    axios.put(`/api/VietRecipe/${food}`, {ingredients, instructions}).then(res => {
      this.setState({
        recipes: res.data,
        ingredients: ``,
        instructions: ``
      });
    });
  }

  searchRecipe() {
    const food = this.state.foodSearch;
    axios.get(`/api/VietRecipes?food=${food}`).then(res => {
      this.setState({recipes: res.data});
    });
  }


  render() {
    const {food, ingredients, instructions} = this.state;
    const mappedRecipes = this.state.recipes.map(recipe => {
      return (
        <DisplayRecipe 
        food={recipe.food}
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
        />
      );
    });
    

    return (
      <div className="App">

      <div className='Title'>
        <h1>Vietnamese Home Cooking Recipes!</h1>
        <h4>All recipes serve 2+ :)</h4>

      </div>

      <div className='Inputs'>

        <div className='Create'>
          <input type='text'
          placeholder='Recipe name'
          onChange={this.handleFood}
          value={this.state.food}/>

          <input type='text'
          placeholder='Ingredients'
          onChange={this.handleIngredients}
          value={this.state.ingredients}/>

          <input type='text'
          placeholder='Instructions'
          onChange={this.handleInstructions}
          value={this.state.instructions}/>

          <button onClick={() => this.createRecipe(food, ingredients, instructions)}>Create</button>
        </div>

        <div className='Update'>
          <input type='text'
          placeholder='Recipe name'
          onChange={this.handleUpdateFood}
          value={this.state.foodUpdate}/>

          <input type='text'
          placeholder='Ingredients'
          onChange={this.handleIngredientsUpdate}
          value={this.state.ingredientsUpdate}/>

          <input type='text'
          placeholder='Instructions'
          onChange={this.handleInstructionsUpdate}
          value={this.state.instructionsUpdate}/>

          <button onClick={() => this.updateRecipe(food)}>Update Recipe</button>
        </div>

        <div className='Delete'>
        <input type='text'
        placeholder='Remove Recipe'
        onChange={this.handleDeleteFood}
        value={this.state.foodDelete}/>

        <button onClick={() => this.deleteRecipe()}>Delete</button>
        </div>

        <div className='Search'>
          <input type='text'
          placeholder='Search for Recipe'
          onChange={this.searchFood}
          value={this.state.foodSearch}/>

          <button onClick={() => this.searchRecipe()}>Search</button>
        </div>

        </div>

        {mappedRecipes}
      </div>
    )
  }
} 
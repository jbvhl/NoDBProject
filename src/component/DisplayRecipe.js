import React from 'react';


export default function DisplayRecipe(props) {
    const food = props.food;
    const ingredients = props.ingredients;
    const instructions = props.instructions;

    return (
        <div className='Recipe'>
            <h2 className='food'>{food}</h2>
            <h3>Ingredients:</h3> 
            <p className='ingredients'>{ingredients}</p>
            <h3>Instructions:</h3> 
            <p className='instructions'>{instructions}</p>
        </div>
    )
}

import React from 'react';
import './DrinkModal.css';

const DrinkModal = ({ drink, onClose }) => {
  // Extract ingredients and measurements from the drink object
  const ingredients = [];
  const measurements = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if (drink[ingredientKey] && drink[measureKey]) {
      ingredients.push(drink[ingredientKey]);
      measurements.push(drink[measureKey]);
    } else {
      break; // Stop loop if ingredient or measure is not present
    }
  }

  return (
    <div className="drink-modal-overlay">
      <div className="drink-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{drink.strDrink}</h2>
        <div>
          <strong>Ingredients:</strong>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient} - {measurements[index]}</li>
            ))}
          </ul>
        </div>
        <p><strong>Instructions:</strong> {drink.strInstructions}</p>
      </div>
    </div>
  );
};

export default DrinkModal;

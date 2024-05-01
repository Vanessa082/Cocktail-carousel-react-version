import React, { useState, useEffect } from "react";
import "./Carousel.css";

export function Carousel() {
  const [drinks, setDrinks] = useState([]);
  const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDrinks(data.drinks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDrinks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [drinks]);

  const handlePrev = () => {
    setCurrentDrinkIndex(
      (prevIndex) => (prevIndex - 1 + drinks.length) % drinks.length
    );
    clearInterval(interval);
  };

  const handleNext = () => {
    setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length);
    clearInterval(interval);
  };

  const handleDetails = () => {
    setShowDetails(!showDetails);
    clearInterval(intervalId);
    if (showDetails) {
      clearInterval(interval);
    } else {
      setInterval(() => {
        setCurrentDrinkIndex((prevIndex) => {
          return (prevIndex + 1) % drinks.length;
        });
      }, 5000);
    }
  };

  return (
    <div className="Carousel">
      <div className={`selected-drink ${showDetails ? "details-visible" : ""}`}>
        {drinks.length > 0 && (
          <>
           <h1 className="h1">{drinks[currentDrinkIndex]?.strDrink}</h1>
            <img
              src={drinks[currentDrinkIndex]?.strDrinkThumb}
              alt={drinks[currentDrinkIndex]?.strDrink}
              className="img"
            />
          </>
        )}
        {showDetails && (
          <div className="recipe-details">
            <h4>Ingredients:</h4>
            <ul>
              {Object.keys(drinks[currentDrinkIndex] || {}).map((key) => {
                if (key.startsWith("strIngredient")) {
                  const ingredient = drinks[currentDrinkIndex][key];
                  if (ingredient) {
                    return (
                      <li key={key}>
                        {ingredient}{" "}
                        {drinks[currentDrinkIndex][`strMeasure${key.slice(10)}`] &&
                          `- ${drinks[currentDrinkIndex][`strMeasure${key.slice(10)}`]}`}
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
            <h4>Instructions:</h4>
            <p>{drinks[currentDrinkIndex]?.strInstructions}</p>
          </div>
        )}
      </div>
      <button className="recipe-details-btn" onClick={handleDetails}>
        {showDetails ? "Close dropdown" : "View Recipe"}
      </button>
      <div className="buttons">
        <button className="prev" onClick={handlePrev}>
          ❮
        </button>
        <button className="next" onClick={handleNext}>
          ❯
        </button>
      </div>
    </div>
  );
}

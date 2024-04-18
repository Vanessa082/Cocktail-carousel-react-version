import { useState, useEffect } from "react";
import "./Carousel.css";

let intervalId;

export function Carousel() {
  const [drinkData, setDrinkData] = useState([]);
  const [showRecipeDropdown, setShowRecipeDropdown] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDrinkData = async () => {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
      );
      const data = await response.json();
      if (data.drinks) {
        setDrinkData(data.drinks.slice(0, 50));
      }
    };

    fetchDrinkData();
  }, []);

  useEffect(() => {
    if (drinkData.length <= 0) return;

    intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % drinkData.length;
      });
    }, 2000);

    return () => {
      // Clean up function
      clearInterval(intervalId);
    };
  }, [drinkData]);

  const handlePrevBtn = () => {
    clearInterval(intervalId);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + drinkData.length) % drinkData.length
    );
  };

  const handleNextBtn = () => {
    clearInterval(intervalId);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % drinkData.length);
  };

  const handleViewRecipe = (drink) => {
    if (!drink) return;

    let showDrpDwn = !showRecipeDropdown;

    setShowRecipeDropdown(showDrpDwn);
    // clearInterval(intervalId);

    if (showDrpDwn) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          return (prevIndex + 1) % drinkData.length;
        });
      }, 2000);
    }
  };

  // console.clear();
  console.log(drinkData, currentIndex);
  //
  return (
    <main>
      <div className="carousel-container">
        <div className="selected-drink active">
          <img
            src={drinkData[currentIndex]?.strDrinkThumb}
            alt="drink-image"
            className="drink-image"
          />
          <h2 className="drink-name">{drinkData[currentIndex]?.strDrink}</h2>

          {showRecipeDropdown && (
            <div
              className={`recipe-dropdown ${
                showRecipeDropdown ? "active" : ""
              }`}
            >
              <p>{drinkData[currentIndex]?.strInstructions}</p>
              {/* <h3>Ingredients</h3> */}
            </div>
          )}

          <button
            className="recipe-button"
            onClick={() => handleViewRecipe(drinkData[currentIndex])}
          >
            {showRecipeDropdown ? "Close dropdown" : "View Recipe"}
          </button>
        </div>

        <button className="prev" onClick={handlePrevBtn}>
          &#10094;
        </button>
        <button className="next" onClick={handleNextBtn}>
          &#10095;
        </button>
      </div>
    </main>
  );
}

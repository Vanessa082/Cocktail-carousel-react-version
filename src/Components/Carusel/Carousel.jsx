import { useEffect, useState } from "react";
import "./Carousel.css";
export function Carousel() {
  const [drinkData, setDrinkData] = useState([]);
  const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsDiv, setShowDetailsDiv] = useState(false)

  let intervalId;
  const handleShowDetailsbtn = (drink) =>{
    if (!drink) return;

    let showDetail = !showDetailsDiv;

    setShowDetailsDiv(showDetail);
    clearInterval(intervalId);

    if (showDetail) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval(() => {
        setCurrentDrinkIndex((prevIndex) => {
          return (prevIndex + 1) % drinkData.length;
        });
      }, 5000);
    }
  }

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
    if (drinkData <= 0) return;
    intervalId = setInterval(() => {
      setCurrentDrinkIndex((prevIndex) => {
        return (prevIndex + 1) % drinkData.length;
      });
    }, 3000);

    return () => {
      // Clean up function
      clearInterval(intervalId);
    };
  }, [drinkData]);

  return (
    <div className="container">
      <h1>Cocktail Carousel</h1>
      <div className="wrapper">
        <div className="wrapper-holder">
          <div
            className="slider"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundImage: `URL(${drinkData[currentDrinkIndex]?.strDrinkThumb})`,
            }}
          >
            <div className="drink-details">
            <h2 className="str-name">
              {drinkData[currentDrinkIndex]?.strDrink}
            </h2>
              <div className="str-ingredients-measure">
                <h4>Ingredients</h4>
                <ul>
                  {Object.keys(drinkData[currentDrinkIndex] || {}).map(
                    (key, index) => {
                      if (
                        key.startsWith("strIngredient") &&
                        drinkData[currentDrinkIndex][key]
                      ) {
                        const ingredient = drinkData[currentDrinkIndex][key];
                        const measure =
                          drinkData[currentDrinkIndex][
                            `strMeasure${index + 1}`
                          ];
                        return (
                          <li key={index}>
                            {ingredient}{" "}
                            {measure && (
                              <span className="measure">({measure})</span>
                            )}
                          </li>
                        );
                      }
                      return null;
                    }
                  )}
                </ul>
              </div>
              <div className="instructions">
                <h4>Instructions</h4>
                <div className="str-instructions">
                  {drinkData[currentDrinkIndex]?.strInstructions
                    .split(". ")
                    .map((step, index) => (
                      <p key={index}>{step}</p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="recipe-details-btn" onClick={handleShowDetailsbtn}>
        {showDetailsDiv ? "Close dropdown" : "View Recipe"}
      </button>

      <div className="direction-btn">
        <button className="prev">
        &#10094;
        </button>
        <button className="next">
        &#10095;
        </button>
      </div>
    </div>
  );
}

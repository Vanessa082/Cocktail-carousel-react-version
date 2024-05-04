import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../Slider/Slider";
import "./Carousel.css"

function Carousel() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"
        );
        // Limit to 50 drinks
        const limitedDrinks = response.data.drinks.slice(0, 50);
        setDrinks(limitedDrinks);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };

    fetchDrinks();
  }, []);

  return (
    <div className="carousel">
      <Slider slides={drinks} />
    </div>
  );
}

export default Carousel;

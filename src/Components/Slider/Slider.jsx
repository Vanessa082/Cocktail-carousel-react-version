import React, { useState, useEffect } from "react";
import DrinkModal from "./DrinkModal/DrinkModal";
import "./Slider.css";

function Slider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [animateTransition, setAnimateTransition] = useState(false);

  const nextSlide = () => {
    setAnimateTransition(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 500); // Duration of the animation
  };

  const prevSlide = () => {
    setAnimateTransition(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      );
    }, 500); // Duration of the animation
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showModal) {
        nextSlide();
      }
    }, 5000); // Adjust the interval duration as needed

    return () => {
      clearInterval(interval);
    };
  }, [showModal]);

  const handleAnimationEnd = () => {
    setAnimateTransition(false);
  };

  return (
    <div className="slider">
      <button className="slide__arrow slide__arrow_left" onClick={prevSlide}>
        {"<"}
      </button>
      <div
        className={`slider_slide ${animateTransition ? "animate" : ""}`}
        onAnimationEnd={handleAnimationEnd}
        style={{
          backgroundImage: `url(${slides[currentIndex]?.strDrinkThumb || ""})`,
        }}
      >
        <div className="slider__text-block">
          <h1 className="slider__title">
            {slides[currentIndex]?.strDrink || "Drink Name"}
          </h1>
          <h4 className="slider__subtitle">
            {slides[currentIndex]?.strCategory || "Drink Category"}
          </h4>
          <button className="slider__button" onClick={toggleModal}>
            Details
          </button>
        </div>
      </div>
      <button className="slide__arrow slide__arrow_right" onClick={nextSlide}>
        {">"}
      </button>
      {showModal && (
        <DrinkModal drink={slides[currentIndex]} onClose={toggleModal} />
      )}
    </div>
  );
}

export default Slider;

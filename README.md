# Drink Carousel Application

This application is a carousel that displays drink data fetched from the "TheCocktailDB" API. The carousel automatically switches between different drinks every 5 seconds. Users can also manually navigate through the drinks using the previous and next buttons. Additionally, users can view the recipe details of a specific drink by clicking on the "View Recipe" button.

## Feature

- Automatic carousel rotation every 5 seconds
- Manual navigation through drinks using previous and next buttons
- Display of drink image and name
- Ability to view recipe details for a specific drink

## Technologies Used

- React
- CSS

## Visuals

![alt text](/image/screencapture-localhost-5173-2024-04-25-16_57_44.png
)

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/drink-carousel.git
cd drink-carousel
```

2. Install dependencies:

```
npm install
```

3. Run the application:

```
npm start
```

4. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

1. The carousel will automatically rotate through different drinks every 5 seconds.
2. Click on the previous button (`&#10094;`) to navigate to the previous drink.
3. Click on the next button (`&#10095;`) to navigate to the next drink.
4. Click on "View Recipe" button to view recipe details for the current drink.
5. The recipe details will animate into view.

## API Information

This application fetches drink data from "TheCocktailDB" API. The API endpoint used is `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`. The application limits the retrieved data to the first 50 drinks that start with the letter 'a'.

## Notes

- The application uses `useState` and `useEffect` hooks to manage the drink data and carousel functionality.
- To prevent memory leaks, the application clears the interval when the user interacts with the carousel or views the recipe details.
- The application uses CSS for styling and animations.

Enjoy exploring and learning about different drinks with the Drink Carousel Application! Cheers 🍹🎉.

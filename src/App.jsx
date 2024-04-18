import { useState } from "react";
import "./App.css";
import { Carousel } from "./assets/Components/Carusel/Carousel";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <h1>Cocktail reciept</h1> */}
      <Carousel />
    </>
  );
}

export default App;

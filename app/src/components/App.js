import React from "react";
import { render } from "react-dom";
import Input from "./Input";
import Buttons from "./Buttons";

function App() {
  // Declare state
  const [state, setState] = React.useState({
    attributes: [
      {
        trait_type: "Trait Type",
        traits: [
          {
            img: "Trait Img Url",
            value: "Trait Value",
            rarity: "Trait Rarity %",
          },
        ],
      },
    ],
    supply: "",
  });

  // Populate state from the backend
  const initialAttribute = state["attributes"][0];
  const initialTrait = state["attributes"][0]["traits"][0];

  if (
    initialAttribute["trait_type"] == "Trait Type" &&
    initialTrait["img"] == "Trait Img Url" &&
    initialTrait["value"] == "Trait Value" &&
    initialTrait["rarity"] == "Trait Rarity %"
  ) {
    // Get user's collection object from database
    async function populateState() {
      const response = await fetch("/initialstate", {
        method: "POST",
      });
      const result = await response.json();
      const storedState = await JSON.parse(result);
      return setState(storedState);
    }
    // Call the function
    populateState();
  }

  return (
    <div>
      <Input state={state} setState={setState} />
      <Buttons state={state} setState={setState} />
    </div>
  );
}

export default App;
render(<App />, document.getElementById("app"));

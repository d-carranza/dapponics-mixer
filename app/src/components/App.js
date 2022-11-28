import React from "react";
import { render } from "react-dom";
import Input from "./Input";
import Buttons from "./Buttons";

// TODO: prepopulate initial state from database

function App() {
  const initialState = {
    attributes: [
      {
        trait_type: "",
        traits: [
          {
            img: "",
            value: "",
            rarity: "",
          },
        ],
      },
    ],
    supply: "",
  };

  const [state, setState] = React.useState(initialState);

  return (
    <div>
      <Input state={state} setState={setState} />
      <Buttons state={state} setState={setState} />
    </div>
  );
}

export default App;
render(<App />, document.getElementById("app"));

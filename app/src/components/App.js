import React from "react";
import { render } from "react-dom";
import Input from "./Input";
import Buttons from "./Buttons";

function App() {
  let initialState = {
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

  // TODO: prepopulate initial state from database LOOK FOR STATE IN THE BACKEND

  // Can this be async?

  // ------------------------------------------
  // async function setinitialstate(props) {
  //   const state = props.state;
  //   const setState = props.setState;

  //   const response = await fetch("/initialstate", {
  //     method: "POST",
  //   });
  //   const result = await response.json();
  //   console.info(result);
  //   return result;
  // }

  // setState({ ...result })
  // return
  // ----------------------------------------

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

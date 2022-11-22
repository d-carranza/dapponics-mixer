import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";

function App() {
  // Initial state replaced when prepopulated later, here is the default 1 trait div info
  const initialState = {
    trait_type_1: {
      name: "part1",
      traits: [
        {
          image:
            "ipfs://QmUsbdVPvxL54zLDUXqLnm8D7Lb4VfnZGf7PPJUA9ejnXM/2070.png",
          name: "lizard",
          rarity: "100",
        },
      ],
    },
  };

  // This state will modify the whole object
  const [state, setState] = React.useState(initialState);

  // Component 1: Trait (the most basic component)
  function Trait(props) {
    // Return rendered specific trait with the image name and rarity data
    return (
      <div className="traits">
        <h3>Trait component</h3>
        <div>Image: </div>
        <div>Name: </div>
        <div>Rarity: </div>
        <button>Remove Trait</button>
      </div>
    );
    // TODO: Inputing an image triggers an upload and when receiving the url updates the state with the url
  }

  // Component 2: Type (renders traits and adds button to add new trait)
  function Type(props) {
    // Return rendered traits for given type (in the props)
    return (
      <div className="part">
        <h3>Type Component</h3>
        <div>Type Name:</div>
        <div className="row">
          {/* // Map traits and fill image, name and rarity */}
          <Trait />
          <button className="newtrait">newtrait</button>
        </div>
        <button>Remove Type</button>
      </div>
    );
  }

  // Component 3: Input (is the div with all the inputs and adds button to add new types)
  function Input(props) {
    return (
      <div id="input">
        <h3>Input Component</h3>
        {/* // Map types and fill names and trait's row */}
        <Type />
        <button>Add Type</button>
      </div>
    );
  }

  // Component 4: Output (supply)
  function Output(props) {
    return (
      <div id="output">
        <h3>Input Component</h3>
        <div id="supply">Enter Supply</div>
      </div>
    );
  }

  // App final return
  return (
    <div>
      <Input />
      <Output />
      <button>Save Changes</button>
      <button>Create Collection</button>
    </div>
  );
}

export default App;
render(<App />, document.getElementById("app"));

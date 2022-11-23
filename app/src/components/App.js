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
        <div className="deletetrait">
          <button name="deletetrait" className="deletebtn">
            x
          </button>
        </div>
        <div className="traitinputs">
          <div>
            <input className="textinput" value="" placeholder="Img Url" />
          </div>
          <div>
            <input className="textinput" value="" placeholder="Trait Name" />
          </div>
          <div>
            <input className="textinput" value="" placeholder="Trait Rarity" />
          </div>
        </div>
      </div>
    );
    // TODO: Inputing an image triggers an upload and when receiving the url updates the state with the url
  }

  // Component 2: Type (renders traits and adds button to add new trait)
  function Type(props) {
    // Return rendered traits for given type (in the props)
    return (
      <div className="type">
        <div className="typeheader">
          <div>
            <input
              className="textinput"
              value=""
              placeholder="Type Name"
              autoFocus={true}
            />
          </div>
          <button name="deletetype" className="deletebtn">
            x
          </button>
        </div>
        <div className="row">
          {/* // Map traits and fill image, name and rarity */}
          <Trait />
          <button className="addtrait">+Add Trait</button>
        </div>
      </div>
    );
  }

  // Component 3: Input (is the div with all the inputs and adds button to add new types)
  function Input(props) {
    return (
      <div id="input">
        Enter the traits of your collecion ordered by type:
        {/* // Map types and fill names and trait's row */}
        <Type />
        <button className="addtype">+Add Type</button>
      </div>
    );
  }

  // Component 4: Output (supply)
  function Output(props) {
    return (
      <div id="output">
        Choose your collection's supply:
        <div>
          <input className="textinput" value="" placeholder="Enter Supply" />
        </div>
      </div>
    );
  }

  // App final return
  return (
    <div>
      <Input />
      <Output />
      <div className="buttons">
        <button className="app-btn">Save Changes</button>
        <button className="app-btn">Create Collection</button>
      </div>
    </div>
  );
}

export default App;
render(<App />, document.getElementById("app"));

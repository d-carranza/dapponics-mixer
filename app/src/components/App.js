import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";

function App() {
  // TODO: prepopulate initial state from database
  const initialState = {
    attributes: [
      {
        trait_type: "type 1",
        traits: [
          {
            img: "ipfs",
            value: "trait 1-1",
            rarity: "40",
          },
          {
            img: "ipfs2",
            value: "trait 1-2",
            rarity: "60",
          },
        ],
      },
      {
        trait_type: "type 2",
        traits: [
          {
            img: "ipfs3",
            value: "trait 2-1",
            rarity: "30",
          },
          {
            img: "ipfs4",
            value: "trait 2-2",
            rarity: "70",
          },
        ],
      },
    ],
    supply: "",
  };

  const [state, setState] = React.useState(initialState);

  // Component 1: Trait (the most basic component)
  function Trait(props) {
    // Receives the type and the trait indexed from Type function
    const typeIndex = props.typeIndex;
    const traitIndex = props.traitIndex;

    // TODO: function to remove that specific trait when button clicked
    // TODO: function to updaTraitImg for all indexes
    // TODO: function to updaTraitName for all indexes
    // TODO: function to updaTraitRarity for all indexes

    // The inputed props contains the specific index for one trait, return the specific trait
    return (
      <div className="traits">
        <div className="removetrait">
          <button name="removetrait" className="removebtn">
            x
          </button>
        </div>
        <div className="traitinputs">
          <div>
            <input
              key="input"
              className="textinput"
              value={state.attributes[typeIndex].traits[traitIndex].img}
              placeholder="Img Url"
            />
          </div>
          <div>
            <input
              key="input"
              className="textinput"
              value={state.attributes[typeIndex].traits[traitIndex].value}
              placeholder="Trait Name"
            />
          </div>
          <div>
            <input
              key="input"
              className="textinput"
              value={state.attributes[typeIndex].traits[traitIndex].rarity}
              placeholder="Trait Rarity"
            />
          </div>
        </div>
      </div>
    );
    // TODO: Inputing an image triggers an upload and when receiving the url updates the state with the url
  }

  // Component 2: Type (renders types, removeType-btn for each type, and addType-btn at the end)
  function Type(props) {
    // Receives the type index from Index function
    const typeIndex = props.typeIndex;

    // TODO: function to add a new trait at the end when button clicked

    // TODO: function to remove that specific type when button clicked
    // TODO: function to updateTypeName for all indexes

    // Esta funcion va bien para el indice 0, pero no para indice 1

    // function updateTypeName(event) {
    //   setState([
    //     {
    //       ...state,
    //       trait_type: event.target.trait_type,
    //     },
    //   ]);
    // }

    return (
      <div className="type">
        <div className="typeheader">
          <div>
            <input
              key="input"
              className="textinput"
              value={state.attributes[typeIndex].trait_type}
              // onChange={updateTypeName}
              placeholder="Type Name"
              // autoFocus={true}
            />
          </div>
          <button name="removetype" className="removebtn">
            x
          </button>
        </div>
        <div className="row">
          {state.attributes[typeIndex].traits.map((trait, index) => (
            <Trait typeIndex={typeIndex} traitIndex={index} />
          ))}
          <button className="addtrait">+Add Trait</button>
        </div>
      </div>
    );
  }

  // Component 3: Input (is the div with all the inputs and adds button to add new types)
  function Input() {
    // TODO: function to add a new type at the end when button clicked

    function updateSupply(event) {
      setState({
        ...state,
        supply: event.target.value,
      });
    }
    return (
      <div>
        <div id="input">
          Enter the traits of your collection ordered by type:
          {state.attributes.map((type, index) => (
            <Type typeIndex={index} />
          ))}
          <button className="addtype">+Add Type</button>
        </div>
        <div id="input-supply">
          Choose your collection's supply:
          <div>
            <input
              key="input"
              className="textinput"
              value={state.supply}
              onChange={updateSupply}
              placeholder="Enter Supply"
            />
          </div>
        </div>
      </div>
    );
  }

  function Buttons() {
    // TODO: add logic to the buttons
    return (
      <div className="buttons">
        <button className="app-btn">Save Changes</button>
        <button className="app-btn">Create Collection</button>
      </div>
    );
  }

  console.log(state);
  // App final return
  return (
    <div>
      <Input key="input" />
      <Buttons />
    </div>
  );
}

export default App;
render(<App />, document.getElementById("app"));

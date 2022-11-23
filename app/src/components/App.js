import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";

function App() {
  // TODO: prepopulate initial state from database
  const initialState = [
    {
      value: "type 1",
      traits: [
        {
          img: "ipfs",
          name: "trait 1-1",
          rarity: "40",
        },
        {
          img: "ipfs2",
          name: "trait 1-2",
          rarity: "60",
        },
      ],
    },
    {
      value: "type 2",
      traits: [
        {
          img: "ipfs3",
          name: "trait 2-1",
          rarity: "30",
        },
        {
          img: "ipfs4",
          name: "trait 2-2",
          rarity: "70",
        },
      ],
    },
  ];

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
              className="textinput"
              value={state[typeIndex].traits[traitIndex].img}
              placeholder="Img Url"
            />
          </div>
          <div>
            <input
              className="textinput"
              value={state[typeIndex].traits[traitIndex].name}
              placeholder="Trait Name"
            />
          </div>
          <div>
            <input
              className="textinput"
              value={state[typeIndex].traits[traitIndex].rarity}
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
    //       value: event.target.value,
    //     },
    //   ]);
    // }

    return (
      <div className="type">
        <div className="typeheader">
          <div>
            <input
              className="textinput"
              value={state[typeIndex].value}
              // onChange={updateTypeName}
              placeholder="Type Name"
              autoFocus={true}
            />
          </div>
          <button name="removetype" className="removebtn">
            x
          </button>
        </div>
        <div className="row">
          {state[typeIndex].traits.map((trait, index) => (
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
    return (
      <div id="input">
        Enter the traits of your collection ordered by type:
        {/* TODO: 1 achieve map types and for each type render Type || 2 for each type pass the index to the fuction Type */}
        {state.map((type, index) => (
          <Type typeIndex={index} />
        ))}
        <button className="addtype">+Add Type</button>
      </div>
    );
  }

  // Component 4: Output (supply)
  function Output(props) {
    // TODO: function to updateSupply
    return (
      <div id="output">
        Choose your collection's supply:
        <div>
          <input className="textinput" placeholder="Enter Supply" />
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

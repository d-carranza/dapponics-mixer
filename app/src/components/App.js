import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";

function App() {
  // TODO: prepopulate initial state from database
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

  function updateSupply(event) {
    setState({
      ...state,
      supply: event.target.value,
    });
  }

  function Trait(props) {
    const typeIndex = props.typeIndex;
    const traitIndex = props.traitIndex;

    function updateImg(event) {
      const stateObject = { ...state };
      stateObject.attributes[typeIndex].traits[traitIndex].img =
        event.target.value;
      setState(stateObject);
    }

    function updateValue(event) {
      const stateObject = { ...state };
      stateObject.attributes[typeIndex].traits[traitIndex].value =
        event.target.value;
      setState(stateObject);
    }

    function updateRarity(event) {
      const stateObject = { ...state };
      stateObject.attributes[typeIndex].traits[traitIndex].rarity =
        event.target.value;
      setState(stateObject);
    }

    function removeTrait() {
      const stateObject = { ...state };
      stateObject.attributes[typeIndex].traits.pop(traitIndex);
      setState(stateObject);
    }

    return (
      <div className="traits" key={traitIndex}>
        <div className="removetrait">
          <button
            name="removetrait"
            className="removebtn"
            onClick={removeTrait}
          >
            x
          </button>
        </div>
        <div className="traitinputs">
          <div>
            <input
              className="textinput"
              value={state.attributes[typeIndex].traits[traitIndex].img}
              onChange={updateImg}
              placeholder="Img Url"
            />
          </div>
          <div>
            <input
              className="textinput"
              value={state.attributes[typeIndex].traits[traitIndex].value}
              onChange={updateValue}
              placeholder="Trait Value"
            />
          </div>
          <div>
            <input
              className="textinput"
              value={state.attributes[typeIndex].traits[traitIndex].rarity}
              onChange={updateRarity}
              placeholder="Trait Rarity"
            />
          </div>
        </div>
      </div>
    );
  }

  function Type(props) {
    const typeIndex = props.typeIndex;

    function updateType(event) {
      const stateObject = { ...state };
      stateObject.attributes[typeIndex].trait_type = event.target.value;
      setState(stateObject);
    }

    function addTrait() {
      console.log("+ Add Trait button was clicked");
      const stateObject = { ...state };
      stateObject.attributes[typeIndex].traits.push({
        img: "",
        value: "",
        rarity: "",
      });
      setState(stateObject);
    }

    function removeType() {
      const stateObject = { ...state };
      stateObject.attributes.pop(typeIndex);
      setState(stateObject);
    }

    return (
      <div className="type" key={typeIndex}>
        <div className="typeheader">
          <div>
            <input
              className="textinput"
              value={state.attributes[typeIndex].trait_type}
              onChange={updateType}
              placeholder="Type Name"
              // autoFocus={true}
            />
          </div>
          <button name="removetype" className="removebtn" onClick={removeType}>
            x
          </button>
        </div>
        <div className="row">
          {state.attributes[typeIndex].traits.map((trait, traitIndex) => (
            <Trait
              key={traitIndex}
              typeIndex={typeIndex}
              traitIndex={traitIndex}
            />
          ))}
          <button className="addtrait" onClick={addTrait}>
            +Add Trait
          </button>
        </div>
      </div>
    );
  }

  function Supply() {
    return (
      <div id="input-supply">
        Choose your collection's supply:
        <div>
          <input
            className="textinput"
            value={state.supply}
            onChange={updateSupply}
            placeholder="Enter Supply"
          />
        </div>
      </div>
    );
  }

  function Input() {
    function addType() {
      const stateObject = { ...state };
      stateObject.attributes.push({
        trait_type: "",
        traits: [
          {
            img: "",
            value: "",
            rarity: "",
          },
        ],
      });
      setState(stateObject);
    }

    return (
      <div>
        <div id="input">
          Enter the traits of your collection ordered by type:
          {state.attributes.map((type, typeIndex) => (
            <Type key={typeIndex} typeIndex={typeIndex} />
          ))}
          <button className="addtype" onClick={addType}>
            +Add Type
          </button>
        </div>
        <Supply />
      </div>
    );
  }

  function Buttons() {
    return (
      <div className="buttons">
        <button className="app-btn">Save Changes</button>
        <button className="app-btn">Create Collection</button>
      </div>
    );
  }

  console.info(state);

  return (
    <div>
      <Input />
      <Buttons />
    </div>
  );
}

export default App;
render(<App />, document.getElementById("app"));

import React from "react";
import Trait from "./Trait";

function Type(props) {
  const state = props.state;
  const setState = props.setState;
  const typeIndex = props.typeIndex;

  function updateType(event) {
    const stateObject = { ...state };
    stateObject.attributes[typeIndex].trait_type = event.target.value;
    setState(stateObject);
  }

  function addTrait() {
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
            autoFocus={true}
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
            state={state}
            setState={setState}
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

export default Type;
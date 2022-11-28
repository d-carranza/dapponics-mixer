import React from "react";
import Type from "./Type";
import Supply from "./Supply";

function Input(props) {
  const state = props.state;
  const setState = props.setState;

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
        <div>
          Enter the traits of your collection ordered by type:
          {state.attributes.map((type, typeIndex) => (
            <Type
              key={typeIndex}
              state={state}
              setState={setState}
              typeIndex={typeIndex}
            />
          ))}
        </div>
        <button className="addtype" onClick={addType}>
          +Add Type
        </button>
      </div>
      <Supply state={state} setState={setState} />
    </div>
  );
}

export default Input;

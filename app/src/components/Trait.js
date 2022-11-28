import React from "react";

// TODO: Improve IMG input with dropdown and manage IMG

function Trait(props) {
  const state = props.state;
  const setState = props.setState;
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
        <button name="removetrait" className="removebtn" onClick={removeTrait}>
          x
        </button>
      </div>
      <div className="traitinputs">
        <div>
          <input
            className="textinput"
            value={state.attributes[typeIndex].traits[traitIndex].img}
            onChange={updateImg}
            placeholder="Trair Img Url"
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
            type="number"
            className="textinput"
            value={state.attributes[typeIndex].traits[traitIndex].rarity}
            onChange={updateRarity}
            placeholder="Trait Rarity %"
          />
        </div>
      </div>
    </div>
  );
}

export default Trait;

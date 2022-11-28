import React from "react";

function Supply(props) {
  const state = props.state;
  const setState = props.setState;
  function updateSupply(event) {
    setState({
      ...state,
      supply: event.target.value,
    });
  }

  return (
    <div id="input-supply">
      Choose your collection's supply:
      <div>
        <input
          type="number"
          className="textinput"
          value={state.supply}
          onChange={updateSupply}
          placeholder="Enter Supply"
        />
      </div>
    </div>
  );
}

export default Supply;

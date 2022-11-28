import React, { Component, useEffect, useState } from "react";

// State is not defined

// TODO: Import function with setState

function Supply() {
  // Fetch state, setState with fetchProducts?

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

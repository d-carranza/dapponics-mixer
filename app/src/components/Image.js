import React from "react";
import Dropzone from "./Dropzone";

// TODO: Input: drop or select png | Output: img url

function Image(props) {
  const { state, setState, typeIndex, traitIndex } = props;

  //_________Updates the state with the URL of the image_________
  function updateImg(event) {
    const stateObject = { ...state };
    stateObject.attributes[typeIndex].traits[traitIndex].img =
      event.target.value;
    // "dropzone";
    setState(stateObject);
  }
  //¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯

  return (
    <div key={traitIndex}>
      <Dropzone />
      <input
        className="textinput"
        value={state.attributes[typeIndex].traits[traitIndex].img}
        onChange={updateImg}
        placeholder="// Trait Img Url"
      />
    </div>
  );
}

export default Image;

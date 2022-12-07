import React from "react";

// TODO: Improve IMG input with dropdown and manage IMG

function Image(props) {
  // Declare variables from the props arguments
  const { state, setState, typeIndex, traitIndex } = props;

  // 1 Create Dropzone
  // 2 When a new file is uploaded in the app, it uploads it to a API cloud and gets the URL
  // 3 Adds that URL to the state
  // 4 When prepopulating... dropzone should update the URL

  // Updates the state with the url of the image
  function updateImg(event) {
    const stateObject = { ...state };
    stateObject.attributes[typeIndex].traits[traitIndex].img =
      event.target.value;
    setState(stateObject);
  }

  return (
    <div key={traitIndex}>
      <input
        className="textinput"
        value={state.attributes[typeIndex].traits[traitIndex].img}
        onChange={updateImg}
        placeholder="Trait Img Url"
      />
    </div>
  );
}

export default Image;

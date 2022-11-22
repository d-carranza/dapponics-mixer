import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";

function App() {
  //App main state
  const [inputState, setInputState] = useState([
    {
      partName: "partName1",
      partTraits: [
        { png: "pnglink", traitname: "name1", rarity: "rarity1" },
        { png: "pnglink2", traitname: "name2", rarity: "rarity2" },
      ],
    },
  ]);

  // App main return
  return (
    <div>
      <h1> Lets do this right </h1>
    </div>
  );
}

export default App;
render(<App />, document.getElementById("app"));

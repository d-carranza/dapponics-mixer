import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Input from "./Input";
import Buttons from "./Buttons";

function App() {
  const [state, setState] = useState({});
  const [loading, setLoadingState] = useState(true);

  // Populate state from the backend
  useEffect(() => {
    // Get user's collection object from database
    async function populateState() {
      const response = await fetch("/storedtraits", {
        method: "POST",
      });
      const result = await response.json();
      const storedState = await JSON.parse(result);

      // Update the state & set loading to false
      setState(storedState);
      return setLoadingState(false);
    }
    populateState();
  }, []);

  if (loading) return null;
  return (
    <div>
      <Input state={state} setState={setState} />
      <Buttons state={state} setState={setState} />
    </div>
  );
}

export default App;
render(<App />, document.getElementById("app"));

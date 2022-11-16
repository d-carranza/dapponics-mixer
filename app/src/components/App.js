import React, { Component } from "react";
import { render } from "react-dom";
import * as React from "react";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <TheRestOfYourApplication />
    </ChakraProvider>
  );
}

// npm run dev

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>Testing react code</h1>;
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

import React from "react";
import mergeImages from "merge-images";

function Buttons(props) {
  const { state } = props;

  async function saveChanges() {
    // Input filter: inputs are not empty
    let nullValues = false;
    for (let attribute of state["attributes"]) {
      if (attribute["trait_type"] == "") {
        nullValues = true;
      }

      for (let trait of attribute["traits"]) {
        if (trait["img"] == "" || trait["value"] == "" || trait["rarity"] == "")
          nullValues = true;
      }
    }
    if (nullValues == true) {
      alert("Some fields are empty");
    }

    // Input filter: rarity total is valid
    let rarityIsValid = false;
    let total = 0;
    for (let attribute of state["attributes"]) {
      total = 0;
      for (let trait of attribute["traits"]) {
        const rarity = parseInt(trait["rarity"]);
        if (typeof rarity == "number" && rarity >= 0) {
          total += rarity;
        }
      }
    }
    if (total == 100) {
      rarityIsValid = true;
    }
    if (rarityIsValid == false) {
      alert("Same trait type rarities must add up 100");
    }

    // Fetch user inputs to the backend
    if (nullValues == false && rarityIsValid == true) {
      const request = {
        method: "POST",
        body: JSON.stringify({ ...state }),
      };
      const response = await fetch("/save", request);
      const result = await response.json();
      console.info(result);
    }
  }

  function createCollection() {
    console.log("Input state:", state);

    // Declare variables
    const supply = state.supply;
    const attributes = state.attributes;

    // Filter valid input
    if (supply == "" || supply <= 0) return console.info("Enter valid supply");

    // 1. Create the whole colection's metadata
    const metadata = [];

    // For each element in the suply
    for (let n = 0; n < supply; n++) {
      const token = {};
      const tokenAttributes = {};

      // Get one trait for each type
      for (const type of attributes) {
        // Set the rarities and values for this trait_type
        const rarities = [];
        const values = [];
        for (const trait of type.traits) {
          rarities.push(trait.rarity);
          values.push(trait.value);
        }

        // Return a value randomly
        function randvalue() {
          const ar = [];
          let i,
            sum = 0;
          for (i = 0; i < rarities.length - 1; i++) {
            sum += rarities[i] / 100.0;
            ar[i] = sum;
          }
          const r = Math.random();
          for (i = 0; i < ar.length && r >= ar[i]; i++);

          // console.log(rarities, values, r, values[i]); // Print for debugging

          return values[i];
        }

        // Add value to type in the new token
        tokenAttributes[type.trait_type] = randvalue();
      }

      // Define token number and attributes
      token["token_id"] = parseInt(n) + 1;
      token["attributes"] = tokenAttributes;

      // Add token to the metadata array (collection trait list)
      metadata.push(token);
    }

    // Parse metadata as JSON
    const jsonMetadata = JSON.stringify(metadata);
    console.log("Collection's metadata.json:", jsonMetadata);

    // 2. From the metadata, create all the tokens and buffer the collection
    let i = 1;
    const allTokens = [];

    // For each metadata's attribute, find the same attribute in the state
    // Then find the same trait and push it's img in the img array
    for (const token of metadata) {
      const tokenbase64pnglist = [];
      const attributes = token.attributes;
      const keys = Object.keys(attributes);
      for (const key of keys) {
        for (const stateAttrib of state.attributes) {
          if (stateAttrib.trait_type == key) {
            for (const trait of stateAttrib.traits) {
              if (trait.value == attributes[key])
                tokenbase64pnglist.push(trait.img);
            }
          }
        }
      }

      // Create an array of layers for each token
      const tokenLayers = [];
      let tokenLayer = 1;
      for (const image of tokenbase64pnglist) {
        // Declare function
        function dataURLtoFile(dataurl, filename) {
          var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, { type: mime });
        }

        //Usage example:
        const file = dataURLtoFile(image, `layer_${tokenLayer}.png`); //Name is not important here
        tokenLayer++;
        tokenLayers.push(file);
      }
      console.log(`Token_${i}'s .png layers:`, tokenLayers);

      //______[1] MERGE PNGS and push result to allTokens: Merge all layers together for each token and save token name as "i"______

      async function mergePngs() {
        // BUG me pide /image.png
        // console.log("123");
        // const merged = await mergeImages(tokenLayers);
        // console.log(merged);
      }
      mergePngs();

      //_______[2] Create folder and include every token.png___________________________________________________________________________

      // ______________________________________________________________________________________________________________________________
      i++;
    }

    // 3. Download files

    // // Download folder containing all tokens.png

    // // Download metadata.json file
    // const blob = new Blob([jsonMetadata], { type: "text/plain" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.download = "metadata.json";
    // link.href = url;
    // link.click();
  }

  return (
    <div className="buttons">
      <button className="app-btn" onClick={saveChanges}>
        Save Changes
      </button>
      <button className="app-btn" onClick={createCollection}>
        Create Collection
      </button>
    </div>
  );
}

export default Buttons;

import mergeImages from "merge-images";
import { Canvas, Image } from "canvas"; // BUGGED importing Canvas and Image

export function mergeLayeredTokens(layeredTokens) {
  // The input of this function is an array with all the arrays of the pngs I need to merge
  const allMergedTokens = [];
  for (const layeredToken of layeredTokens) {
    // Merge the layers (png files) contained on this array
    //
    const layers = [...layeredToken];
    console.log("123");

    // mergeImages is async https://www.youtube.com/watch?v=LW1i-axSoYE&ab_channel=KieCodes

    // BUGGED Problem in the rooting of layers, is not app url or file pathing
    // How can i solve this?

    mergeImages(layers, { Canvas: Canvas, Image: Image }).then((image) => {
      console.log(image);
    });

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    // Push the resulted file to allMergedTokens
  }
  return allMergedTokens; //The output of this function is the array wit all the merged tokens
}

export function createMetadata(supply, attributes) {
  const metadata = [];

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
  return metadata;
}

export function createLayeredTokens(state, metadata) {
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
    // console.log(`Token_${i}'s .png layers:`, tokenLayers);
    allTokens.push(tokenLayers);
  }
  return allTokens;
}

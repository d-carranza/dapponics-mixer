// import React, { Component, useEffect, useState } from "react";

// function Input() {
//     function addType() {
//       const stateObject = { ...state };
//       stateObject.attributes.push({
//         trait_type: "",
//         traits: [
//           {
//             img: "",
//             value: "",
//             rarity: "",
//           },
//         ],
//       });
//       setState(stateObject);
//     }

//     return (
//       <div>
//         <div id="input">
//           Enter the traits of your collection ordered by type:
//           {state.attributes.map((type, typeIndex) => (
//             <Type key={typeIndex} typeIndex={typeIndex} />
//           ))}
//           <button className="addtype" onClick={addType}>
//             +Add Type
//           </button>
//         </div>
//         <Supply />
//       </div>
//     );
//   }

//   export default Input;

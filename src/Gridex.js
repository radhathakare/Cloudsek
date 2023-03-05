import React, { useState } from "react";
import "./App.css";
import { Draggable } from 'drag-react';



function Gridex() {
  const [grid, setGrid] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState("");
  const [score, setScore] = useState(0);
  let recommendedHouse = '';
  const [layout, setLayout] = useState([
    // your housing layout here
    // each element in the array represents a row in the layout
    // each element in the row represents a plot in the layout
    // 0 represents an empty plot, 1 represents a house, 2 represents a restaurant, 3 represents a gym, and 4 represents a hospital
    [1, 0, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [4, 3, 0, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  

  const handleGridSize = (event) => {
    const { value } = event.target;
    const size = parseInt(value);
    const newGrid = Array(size)
      .fill()
      .map(() => Array(size).fill(""));
    setGrid(newGrid);
  };

  const handleServiceSelection = (event, row, col) => {
    const { value } = event.target;

    
    const newGrid = [...grid];
    newGrid[row][col] = value;
    if (value === "House") {
      setSelectedHouse(`House-${row}-${col}`);
    }
    setGrid(newGrid);
  };

  const calculateScore = () => {
    let totalScore = 0;
   
    const housePos = selectedHouse.split("-").slice(1);
    grid.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value === "Restaurant") {
          const dist = Math.abs(rowIndex - housePos[0]) + Math.abs(colIndex - housePos[1]);
          totalScore += 5 - dist;
        } else if (value === "Gym") {
          const dist = Math.abs(rowIndex - housePos[0]) + Math.abs(colIndex - housePos[1]);
          totalScore += 3 - dist;
        } else if (value === "Hospital") {
          const dist = Math.abs(rowIndex - housePos[0]) + Math.abs(colIndex - housePos[1]);
          totalScore += 10 - dist;
        }
      });
    });
    setScore(totalScore);
    const handleRecommendHouseClick = () => {
        const recommendedHouse = recommendHouse();
        console.log(`Recommended house: ${recommendedHouse}`);
      };
  };
  const recommendHouse = () => {
    let maxScore = -1;
  

    // iterate through all the plots in the layout
    for (let i = 0; i < layout.length; i++) {
      for (let j = 0; j < layout[i].length; j++) {
        // check if the plot contains a house
        if (layout[i][j] === 1) {
          let score = 0;

          // iterate through all the plots in the layout again
          for (let m = 0; m < layout.length; m++) {
            for (let n = 0; n < layout[m].length; n++) {
              // check if the plot contains a service
              if (layout[m][n] !== 0 && layout[m][n] !== 1) {
                // calculate the distance between the house and the service
                const distance =
                  Math.abs(i - m) + Math.abs(j - n);

                // increment the score based on the distance
                score += distance;
              }
            }
          }

          // divide the total score by the number of services to get the average score
          score /= (layout.length * layout[0].length - 1) - 1;

          // update the recommended house if the score is higher than the current maximum score
          if (score > maxScore) {
            maxScore = score;
            recommendedHouse = `House ${i}-${j}`;
          }
        }
      }
    }

    return recommendedHouse;
  };
  const handleRecommendHouseClick = () => {
    const recommendedHouse = recommendHouse();
    console.log(`Recommended house: ${recommendedHouse}`);
  };

  return (
    <div className="Container">
       
      <h1 className="title">Housing Recommendation</h1>
      <div className="Grid-container">
      <label htmlFor="gridSize">Grid Size:</label>
      <input type="number" id="gridSize" name="gridSize" min="1" max="10" onChange={handleGridSize} />
      </div>
      <table className="tablecontainer">
        <tbody>
       
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                 <div class="card"></div>
                
                // <td key={colIndex}>
                //   <select value={value} onChange={(e) => handleServiceSelection(e, rowIndex, colIndex)}>
                //     <option value=""></option>
                //     <option value="House">House</option>
                //     <option value="Restaurant">Restaurant</option>
                //     <option value="Gym">Gym</option>
                //     <option value="Hospital">Hospital</option>
                //   </select>
                  
                // </td>
               
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedHouse && <p className="selctedhouse">Selected House: {selectedHouse}</p>}
      <button className="HouseButton" onClick={calculateScore}>Recommend Best House</button>
      {score > 0 && <p className="selctedhouse">Best House Score: {score}</p>}
    </div>
  );
}

export default Gridex;

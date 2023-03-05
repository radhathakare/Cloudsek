import React, { useState } from 'react';
import './App.css';


function HouseRecommendation() {
    const [togglebtn, setTogglebtn] = useState(false);

    const layout = [
        ['House 1', 'Restaurant', 'Gym'],
        ['Hospital', 'Restaurant', 'Gym'],
        ['Restaurant', 'Gym', 'House 2'],
    ];

    // Define the list of services
    const services = ['Restaurant', 'Gym', 'Hospital'];

    // Define the function to calculate the score for a given house
    function calculateScore(house, row, col) {
        let score = 0;
        // Loop through each element of the layout
        for (let i = 0; i < layout.length; i++) {
            for (let j = 0; j < layout[i].length; j++) {
                // If the element is a service and is within 1km distance of the house, add 1 to the score
                if (services.includes(layout[i][j]) && Math.abs(i - row) + Math.abs(j - col) <= 1) {
                    score++;
                }
            }
        }
        return score;
    }

    // Define the function to recommend the best house
    function recommendHouse() {
        let bestHouse = null;
        let bestScore = -1;
        // Loop through each element of the layout
        for (let i = 0; i < layout.length; i++) {
            for (let j = 0; j < layout[i].length; j++) {
                // If the element is a house, calculate its score and update the best house if necessary
                if (layout[i][j].startsWith('House')) {
                    const score = calculateScore(layout[i][j], i, j);
                    if (score > bestScore) {
                        bestHouse = layout[i][j];
                        bestScore = score;
                    }
                }
            }
        }
        return bestHouse;
    }
    const handleRecommendHouseClick = () => {
        const bestHouse = recommendHouse();
        console.log('Best house recommendation:', bestHouse);
    };

    //   Call the recommendHouse function to get the best house recommendation
    const bestHouse = recommendHouse();
    console.log('Best house recommendation:', bestHouse);

    return (
        <div className="Container">

            <h1 className="title">Housing Recommendation</h1>

            <div className="martix-container">

                <div className="matrix-board">

                    <div className="matrix-box">House1</div>
                    <div className="matrix-box">Restaurant</div>
                    <div className="matrix-box">Gym</div>
                    <div className="matrix-box">Hospital</div>
                    <div className="matrix-box">Restaurant</div>
                    <div className="matrix-box">Gym</div>
                    <div className="matrix-box">Restaurant</div>
                    <div className="matrix-box">Gym</div>
                    <div className="matrix-box">House2</div>
                </div>

            </div>
            <div onClick={() => setTogglebtn(!togglebtn)}>
                <button className="HouseButton" onClick={handleRecommendHouseClick}>Best House</button>
            </div>
            {togglebtn && (<p className="selctedhouse">Best House : {bestHouse}</p>)}

        </div>
    );
}

export default HouseRecommendation;

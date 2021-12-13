import React from "react";
import "./WelcomeBox.css";
import tmm from "../lib/The_Mead_Mathematician.png";

export const WelcomeBox = ({mathematician}) => 
{
    return <div className="welcomeBox">
        <div className="welcomeText">
            {/* <span>Hello!</span> */}
            <span className="hello">Hello {mathematician}!</span>
            <span>Let's do some a-maz-ing maths! <span role="img" aria-label="smiley">😊</span></span>
        </div>
        <div className="awardBoard">
            <img className="theMeadMath" src={tmm} alt="the_mead_mathematician"></img></div>      
    </div>
}
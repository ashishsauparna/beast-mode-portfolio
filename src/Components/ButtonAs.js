import React from "react";
import { NavLink } from "react-router-dom";
import blackArrow from "../arrow_left.svg"
import "../App.css"

const ButtonAs = (buttonName) => {

    return(
        <NavLink onClick={buttonName.onPress} style={({isActive}) => {
            return{ 
                borderBottom: isActive ? "3px solid #232122" : "none",
                paddingBottom: isActive ? "2px" : "0",
            }}} className="link" to={buttonName.path}>
                <img className="arrow_image" src={blackArrow} alt="arrow"/>
                <span>{buttonName.name}</span></NavLink>
    );
}

export default ButtonAs;
import React from "react";
import { NavLink } from "react-router-dom";
import blackArrow from "../arrow_left.svg"
import "../App.css"

const ButtonAs = (buttonName) => {

    //const [hoverArrow, setHoverArrow] = useState()
    // onMouseOver={() => setHoverArrow(true)} onMouseOut={() => setHoverArrow(false)}

    return(
        <NavLink onClick={buttonName.onPress} style={({isActive}) => {
            return{ 
                borderBottom: isActive ? "3px solid #232122" : "none",
                paddingBottom: isActive ? "2px" : "0",
            }}} className="link nav_button" to={buttonName.path}>
                <img src={blackArrow} alt="arrow" style={{transform:"rotate(180deg)", width:"25px", marginRight:"13px"}}/>
                <span>{buttonName.name}</span></NavLink>
    );
}

export default ButtonAs;
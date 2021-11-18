import { useNavigate } from "react-router-dom";
import '../App.css';

export default function GridItem(grid) {
    const navigate = useNavigate();
    return(
        <div onClick={() => { navigate(grid.routerLink, {state: grid.routerLink})}} className={grid.class}>
            <img src={grid.image} alt="logo1" style={{width:"100%", height:"auto", marginBottom:"10px"}}/>
            <b style={{color:"#232122"}}>{grid.name}</b>
            <p style={{opacity:"0.45", marginTop:"8px", color:"#232122"}}>{grid.brief}</p>
        </div>
    )
  }
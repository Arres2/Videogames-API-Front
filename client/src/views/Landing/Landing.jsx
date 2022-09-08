import React from "react";
import style from "./Landing.module.css"
import logo from "../../assets/soup.png"
import { Link } from "react-router-dom";

const Landing = ()=>{
    
    return (
        <div className={style.landing}>
            <h1>Welcome to Gamer's Haven!</h1>
            <Link to="/videogames">
            <img src={logo} alt="Mushroom logo" />
            </Link>
            <h4>Click the Image to continue</h4>
        </div>
    )
}

export default Landing
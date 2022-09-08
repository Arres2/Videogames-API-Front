import React, { Component } from "react";
import { Link } from 'react-router-dom';
import style from "./Nav.module.css";
import logo from "../../assets/soup.png"


class Nav extends Component {
  render() {
    return(
      <nav>
        <div className={style.container}>
          
          <Link to={"/videogames"}>
            <img src={logo}/>
          </Link>
          <div className={style.createButton}>
          <Link to={"/create"}>Create Your Own</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav;

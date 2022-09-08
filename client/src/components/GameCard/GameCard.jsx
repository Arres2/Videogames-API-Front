import React from "react";
import style from "./RecipeCard.module.css"
import icon from "../../assets/bullet.jpeg"
import { Link } from "react-router-dom";




const GameCard = (props) => {

  return (
    <div className={style.ft_recipe}> 
      <div className={style.ft_recipe__thumb}>
        <img src={props.img} alt={props.name}/>
      </div>
      <div className={style.ft_recipe__content}>
        <header className={style.content__header}>
        <div className={style.row_wrapper}>
          <h2 className={style.recipe_title}>{props.name}</h2>
        </div>
      <div className={style.bullets}>
        <ul>
        <h5>Genres:</h5>
        {props.genres.map(el=>{
          return(
          <div className={style.dietTypes}>
            <img className={style.iconBullet} src={icon}/>
            <p className={style.description}>
            {el}
            </p>
          </div>
          )
          })}
        </ul>
      </div>
  
        </header>
      <div className={style.content__footer}>

      <Link to= {`/videogames/${props.id}`} >Description</Link>
      </div>
      </div>
    </div>
  );
};

export default GameCard;

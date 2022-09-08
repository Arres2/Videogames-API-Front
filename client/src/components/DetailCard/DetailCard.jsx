import React from "react";
import style from "./DetailCard.module.css"



const DetailCard = (props) => {

  console.log(props);

  return (
    <div className={style.detailCard } key={props.id}>
      <div  className={style.container}>
          <h1> {props.name.toUpperCase()}</h1>
          <h3>Rating: {props.rating}</h3>
          <h3>Metacritic Score: {props.metacritic}</h3>
          <img src={props.img} alt={props.name} />
          
         
          <div className={style.other}>
              <div className={style.dish_types}>
              <h4>Genres</h4>
         
              {props.genres.map(el=>{
                return <span>{el}</span>
              })}
              </div>
         
              <div className={style.diets}>
                <h4>Platforms</h4>
              {props.platforms.map(el=>{
                return <span>{el}</span>
              })}
              </div>
          </div>
          <div className={style.summary}>Description: {props.description}</div>
          <div className={style.steps}>
            Release Date: {props.releaseDate}

          </div>
      </div>

    </div>
  );
};

export default DetailCard;

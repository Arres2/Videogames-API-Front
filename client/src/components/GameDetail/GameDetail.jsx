import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link  } from "react-router-dom";
import { getGameDetail} from "../../redux/actions";
import DetailCard from "../DetailCard/DetailCard";
import style from "../DetailCard/DetailCard.module.css"


const GameDetail =  () => {
   const {gameId} =  useParams()
   const dispatch = useDispatch()
   const detail = useSelector(state => state.detail)

  
   
   useEffect(()=>{

      dispatch(getGameDetail(gameId))

},[dispatch,gameId])


  if(detail.name === undefined){
    return(
      <div className="loadingAnimation">
        <img src="https://media.giphy.com/media/Zy8JjTf53v4AbeWSun/giphy.gif"/>
      </div>
    )
  }

   return (
       <div>
          <DetailCard
            key={detail.id}
            id={detail.id}
            name={detail.name}
            platforms={detail.platforms.map(el=>el.platform? el.platform.name: el)}
            genres={detail.genres?.map(el=>el.name? el.name: el)}
            rating = {detail.rating}
            releaseDate = {detail.released? detail.released: detail.release}
            metacritic = {detail.metacritic? detail.metacritic : "No score found"}
            description = {detail.description}
            screenShots = {detail.short_screenshots? detail.short_screenshots.map(el=>el.image):null}
            img={detail.background_image? detail.background_image:detail.image}
          />
          <div className={style.pagination}>
            <Link to="/videogames">
              <button className={style.pagination_button}>Back</button>
            </Link>
          </div>
         
       </div>
   )
};
export default GameDetail;

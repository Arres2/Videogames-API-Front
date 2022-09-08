import React, { useState, } from "react";
import GameCard from "../GameCard/GameCard";
import { useSelector } from "react-redux";
import { ordered, filterByGenre } from "../../redux/actions/filters";
import style from "./Recipes.module.css"
import pag_style from "./Pagination.module.css"




const Games = () => {
  
  let order = useSelector(state=>state.order)
  let genre = useSelector(state=>state.genre)
  let games = useSelector(state=>state.games)
  let searching = useSelector(state=>state.searching)
  let all_games = useSelector(state=>state.all_games)
  
  let [page, setPage] = useState(0)

 
  
  if(searching){
    
    games = games.filter((el)=>{
      return el.name.includes(searching)
    })
  }

  if (genre){ 
    games = filterByGenre(genre, games)}
    
  if (order){ 
    games = ordered(order, games);}
      
      
  const pagination = () => {
    if (games.length) return games.slice(page, page + 15);
    return [];
  };
      
  const currentPage = pagination();

  
  const nextPage = () => {
    if (games.length > page + 15) {
      setPage(page + 15);
    }
  };
  
  const previusPage = () => {
    if (page > 0) {
      setPage(page - 15);
    }
  };
  
  if(!all_games[0]){
  
    return <img src="https://media.giphy.com/media/Zy8JjTf53v4AbeWSun/giphy.gif" />
  }
  else if(all_games[0] && games[0] ===undefined) {
    return <h2>No Games found on this lot...</h2>}        
    
  return (
      <div>
    <div className={style.cards_container}>
        {currentPage?.map(({name, genres, id, background_image, image})=>{ 
          return(
            
            <div className={style.card} key={id}>
                <GameCard
                id ={id}
                name= {name}
                genres = {genres?.map(el=>el.name? el.name:el)}
                img= {background_image? background_image:image}
              
                />
                
        </div>
                
          )})}
    </div>
        <div className={pag_style.pagination}>
          <button onClick={previusPage} className={pag_style.pagination_button}>
            &laquo; Previus
            </button>
            <button onClick={nextPage} className={pag_style.pagination_button}>
            Next &raquo;
          </button> 
        </div>
    </div>


)
}

  export default Games;


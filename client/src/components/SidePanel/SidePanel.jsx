import React from "react"
import style from "./SidePanel.module.css"
import { useDispatch } from "react-redux"
import {filterByGenre,order, isSearching } from "../../redux/actions"



const SidePanel = ()=>{
    const dispatch = useDispatch()

    function capitalizeFirstLetter(str) {

        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    
        return capitalized;
    }


    const handleType = (e)=>{

        
        dispatch(filterByGenre(e.target.value))

        
    }
    const orderBy = (e) => {
        dispatch(order(e.target.value));
      }

    const handleTyping =(e)=>{
        e.preventDefault();
        dispatch(isSearching(capitalizeFirstLetter(e.target.value)))
        

    }
    

    return (
    <aside>
        <form action="videogames">
            <label>Search by name</label>
            <input type="text" name="name" className={style.searchBar} placeholder="Spider-Man..." onChange={handleTyping}></input>
        </form>
        <select name="Ordenar" className={style.orderInput} onChange={orderBy}>
          <option value="">Ordenar por:</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="Rating+">Rating+</option>
          <option value="Rating-">Rating-</option>
        </select>
        <select name="type" className={style.dietInput} onChange={handleType}>
            <option value="">None</option>
            <option value="Action">Action</option>
            <option value="Indie">Indie</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Strategy</option>
            <option value="Shooter">Shooter</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulation</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Platformer</option>
            <option value="Racing">Racing</option>
            <option value="Massively Multiplayer">Massively Multiplayer</option>
            <option value="Sports">Sports</option>
            <option value="Fighting">Fighting</option>
            <option value="Family">Family</option>
            <option value="Board Games">Board Games</option>
            <option value="Educational">Educational</option>
            <option value="Card">Card</option>
        </select>
    </aside>
)}

export default SidePanel
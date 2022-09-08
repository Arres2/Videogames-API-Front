import { v4 as uuidv4 } from "uuid";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAMES = "GET_GAMES";
export const CREATE_GAME = "CREATE_GAME";
export const GET_DETAIL = "GET_DETAIL";
export const DELETE_GAME = "DELETE_GAME";
export const GET_GENRES = "GET_GENRES";
export const FILTER = "FILTER";
export const BY_GENRE = "BY_GENRE";
export const ORDER = "ORDER";
export const SEARCH = "SEARCH";

export const getGames = (name) => async (dispatch) => {
  if (name) {
    try {
      let response2 = await fetch(`http://localhost:3001/videogames`);
      let results2 = await response2.json();
      dispatch({ type: GET_ALL_GAMES, payload: results2 });
      let game = results2.filter((el) => el.name.includes(name));
      dispatch({ type: GET_GAMES, payload: game });
    } catch (err) {
      throw Error(err);
    }
  } else {
    try {
      let response2 = await fetch(`http://localhost:3001/videogames`);
      if (response2.status === 404) return alert("No Videogames found :/");
      let results2 = await response2.json();
      dispatch({ type: GET_ALL_GAMES, payload: results2 });
      dispatch({ type: GET_GAMES, payload: results2 });
    } catch (err) {
      throw Error(err);
    }
  }
};

export const getGameDetail = (id) => async (dispatch) => {
  try {
    let response = await fetch(`http://localhost:3001/videogames/${id}`);

    dispatch({ type: GET_DETAIL, payload: await response.json() });
  } catch (err) {
    throw Error(err);
  }
};

export const getGenres = () => async (dispatch) => {
  let url = `http://localhost:3001/genres `;

  try {
    let x = await fetch(url);
    let response = await x.json();

    dispatch({ type: GET_GENRES, payload: response });
  } catch (err) {
    throw Error(err);
  }
};

export const isSearching = (search) => {
  return {
    type: SEARCH,
    payload: search,
  };
};

export const order = (ord) => {
  return {
    type: ORDER,
    payload: ord,
  };
};

export const filterByGenre = (genre) => {
  return {
    type: BY_GENRE,
    payload: genre,
  };
};

let id = uuidv4();

export const createVideogames = (data) => async (dispatch) => {
  let game = { ...data, id: id };
  console.log("actions", data);
  try {
    const crear = await fetch("http://localhost:3001/videogames", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
    const response = await crear;
    console.log(response);
    if (response.status === 200) alert("Juego creado con exito!");
    else
      alert(
        "Hubo un error en la creacion del juego, por favor refresque la pagina e intente de nuevo"
      );
    // dispatch({
    //   type: CREATE_GAME,
    //   payload: { ...response, id: id },
    // });
  } catch (err) {
    throw Error(err);
  }
};

export const deleteVideogames = (id) => {
  return { type: DELETE_GAME, payload: id };
};

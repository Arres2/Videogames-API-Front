import {
  // Importa las actions types que necesites acá:
  GET_ALL_GAMES,
  GET_GAMES,
  GET_DETAIL,
  DELETE_GAME,
  // CREATE_RECIPE,
  GET_GENRES,
  FILTER,
  BY_GENRE,
  ORDER,
  SEARCH,
} from "../actions/index";

const initialState = {
  // Tus estados acá
  all_games: [],
  games: [],
  detail: {},
  all_genres: [],
  genre: "",
  order: "",
  searching: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código
    case GET_ALL_GAMES:
      return {
        ...state,
        all_games: action.payload,
      };
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case DELETE_GAME:
      return {
        ...state,
        games: state.all_games.filter((H) => H.id !== action.payload),
      };
    // case CREATE_games:
    //   return {
    //     ...state,
    //     team: [...state.team, action.payload]
    //   };
    case GET_GENRES:
      return {
        ...state,
        all_genres: action.payload,
      };
    case FILTER:
      return {
        ...state,
        games: action.payload,
      };
    case BY_GENRE:
      state.games = state.all_games;
      return {
        ...state,
        genre: action.payload,
      };
    case ORDER:
      state.games = state.all_games;
      return {
        ...state,
        order: action.payload,
      };
    case SEARCH:
      state.games = state.all_games;
      return {
        ...state,
        searching: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;

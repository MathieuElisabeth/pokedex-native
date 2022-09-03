import { createStore, combineReducers } from "redux";

const pokemonState = [];

const pokemonReducer = (state = pokemonState, action) => {
  switch (action.type) {
    case "SET_POKEMONS":
      return action.data;
    default:
      return state;
  }
};

const limitState = 30;

const limitReducer = (state = limitState, action) => {
  switch (action.type) {
    case "CHANGE_LIMIT":
      return state += 30;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  pokemonReducer,
  limitReducer
})

const store = createStore(rootReducer);

export default store;

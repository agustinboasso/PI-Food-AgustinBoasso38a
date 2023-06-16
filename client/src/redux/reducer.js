import { GET_RECIPES, ADD_RECIPE, GET_DIETS, SRC_RECIPE, GET_RECIPEID, CLEAN_DETAIL  } from "./actions";

const initialState = {
  recipes: [],
  dietOptions: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
      case GET_DIETS: 
      return {
        ...state,
        dietOptions: action.payload,
      };
      case SRC_RECIPE:
        return{
          ...state,
          recipes: action.payload
        };
      case GET_RECIPEID:
         return {
          ...state,
          recipe: action.payload,
        
        };
      case CLEAN_DETAIL:
        return{
          ...state,
          recipes: [],
        }      
    default:
      return state;
  }
};

export default rootReducer;
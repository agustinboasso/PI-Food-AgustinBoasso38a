import { GET_RECIPES, ADD_RECIPE, GET_DIETS, SRC_RECIPE, GET_RECIPEID, CLEAN_DETAIL, SET_CURRENT_PAGE, SORT_RECIPES  } from "./actions";

const initialState = {
  recipes: [],
  dietOptions: [],
  currentPage: 1,
  selectedDietType: null,
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
        };
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload,
        };
        case SORT_RECIPES:
          const { option, direction } = action.payload;
    
          // Realizar el ordenamiento de las recetas
          let sortedRecipes = [...state.recipes];
          if (option === 'alphabetical') {
            sortedRecipes.sort((a, b) => {
              if (direction === 'asc') {
                return a.name.localeCompare(b.name);
              } else {
                return b.name.localeCompare(a.name);
              }
            });
          } else if (option === 'healthScore') {
            sortedRecipes.sort((a, b) => {
              if (direction === 'asc') {
                return a.healthScore - b.healthScore;
              } else {
                return b.healthScore - a.healthScore;
              }
            });
          }
    
          return {
            ...state,
            recipes: sortedRecipes,
          };;          
    default:
      return state;
  }
};

export default rootReducer;
import axios from "axios"

export const GET_DIETS = "GET_DIETS";
export const ADD_RECIPE = "ADD_RECIPE"
export const GET_RECIPES = "GET_RECIPES";
export const SRC_RECIPE = "SRC_RECIPE";
export const GET_RECIPEID = "GET_RECIPEID";
export const CLEAN_DETAIL = "CLEAN_DETAIL";

//trae todas las recetas
export const getRecipes = () => {
    return async function (dispatch){
        const apiData = await axios.get(`http://localhost:3001/recipes`)
        const recipes = apiData.data;
        dispatch({type: GET_RECIPES, payload: recipes})
    }
}


export const addRecipe = (recipe) => {
  console.log(recipe)
  return async function (dispatch) {
    try {
      const response = await axios.post('http://localhost:3001/recipes', recipe);
      dispatch({ type: ADD_RECIPE, payload: response.data });
      
    } catch (error) {
      console.error(error);
    }
  };
};


export const getDiets = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/diets');
      dispatch({ type: GET_DIETS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};


export const searchRecipes = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      
      if (data.length > 0) {
        dispatch({
          type: SRC_RECIPE,
          payload: data
        });
      } else {
        alert('No hay recetas con este nombre.');
      }
    } catch (error) {
      console.error(error);
      alert('Error al buscar recetas.');
    }
  };
};


export const getRecipeId = (id) => {
  
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      const recipe = response.data;
      
      dispatch({ type: GET_RECIPEID, payload: recipe });
    } catch (error) {
      console.error(error);
      alert('Error al buscar recetas.');
    }
  };
};

export const cleanDetail = () => {
  return {type:CLEAN_DETAIL}  
}

//trae el detalles las recetas
// /:idRecipe
// export const getRecipeId = (id) => {
//     return async function (dispatch){
//         const apiData = await axios.get(`http://localhost:3001/recipes/:idRecipes`)
//         const user = apiData.data;
//         dispatch({type: GET_USER, payload: recipe})
//     }
// }

//filtros van aca

// export const filterBySource = ()=>{
//     dispatch({type: FILTER_GET, payload:)
// } 
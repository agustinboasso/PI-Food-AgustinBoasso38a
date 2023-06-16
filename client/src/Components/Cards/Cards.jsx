import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../../redux/actions';
import Card from '../Card/Card';
import styles from './Cards.module.css';

const Cards = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const currentPage = useSelector((state) => state.currentPage);
  const recipesPerPage = 10; // Número de recetas por página

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  
  // Lógica para obtener las recetas de la página actual
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  

  return (
    <div className={styles.container}>
      {currentRecipes.map((recipe) => {
        let diets = [];
        if (Array.isArray(recipe.diets)) {
          diets = recipe.diets;
        }

        return (
          <Card
            id={recipe.id}
            key={recipe.id}
            name={recipe.name}
            image={recipe.image}
            diet={diets}
          />
        );
      })}
    </div>
  );
};

export default Cards;



// import Card from '../Card/Card'
// import styles from './Cards.module.css'
// import {useSelector} from 'react-redux'



// const Cards = () => {
//   const recipes = useSelector(state=>state.recipes)

//   return (
//     <div className={styles.container}>
      
//       {recipes.map(recipe => {
//   let diets = []; // Array vacío por defecto
//   if (Array.isArray(recipe.diets)) {
//     diets = recipe.diets; // Asignar el array de dietas si es válido
//   }

//   return (
//     <Card 
//       name={recipe.name}
//       image={recipe.image}
//       diet={diets}
//     />
//   );
// })}
      


//     </div>
//   )
// }

// export default Cards
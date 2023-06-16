import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getRecipes } from '../../redux/actions';

const Cards = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {recipes.map(recipe => {
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
}

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
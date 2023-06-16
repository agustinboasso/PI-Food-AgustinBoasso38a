import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getRecipeId,cleanDetail } from '../../redux/actions';
import styles from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getRecipeId(id));
    return () => {
      dispatch(cleanDetail()); // Limpia los datos al desmontar el componente
  };
  }, [dispatch, id]);

  if (!recipe) {
    return <div className={styles['error-message']}>Receta no encontrada</div>;
  }
  console.log(recipe);
  return (
    <div className={styles.container}>
      <h1>{recipe.name}</h1>
      <ul>
        <li>ID: {recipe.id}</li>
        <li>Nombre: {recipe.name }</li>
        <li className={styles.summary}>Resumen de plato: {recipe.summary}</li>
        <li className={styles['health-score']} >Health Score: {recipe.healthScore}</li>
        {recipe.stepByStep?(<li className={styles.steps}>Steps: {recipe.stepByStep}</li>):(<li className={styles.steps}>Steps: {recipe.steps}</li>)}
        
        <li><img src={recipe.image} alt={recipe.name } /></li> 
        <ul className={styles['diet-list']}> Diet:
        {recipe.diets.map((diets, index) => (
          <li key={index}>{diets}</li>
        ))}
      </ul>
      </ul>
    </div>
  );
};

export default Detail;


// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import {getRecipeId} from '../../redux/actions';

// const Detail = () => {
//   const { id } = useParams();
  
//   const recipes = useSelector((state) => state.recipes);
//   const recipe = recipes.find((recipe) => recipe.id === id);

//   if (!recipe) {
//     return <div>Receta no encontrada</div>;
//   }

//   return (
//     <div>
//       <h1>{recipe.name}</h1>
//       <ul>
//         <li>ID: {recipe.id}</li>
//         <li>Nombre: {recipe.name}</li>
//         <li>Resumen de plato: {recipe.summary}</li>
//         <li>Health Score: {recipe.healthScore}</li>
//         <li>Steps: {recipe.steps}</li>
//         <li>Img: {recipe.image}</li>
//         <li>Dietss: {recipe.diets.join(', ')}</li>
//       </ul>
//     </div>
//   );
// };

// export default Detail;
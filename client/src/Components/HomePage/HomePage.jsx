import Cards from '../Cards/Cards';
import styles from './HomePage.module.css';
import {useEffect} from "react";
import { useDispatch } from 'react-redux';
import {getRecipes} from "../../redux/actions"



const HomePage = () => {

  //cuando se monta (useEffect(majenamos el ciclo de vida )), que haga el dispatch(useDistpatch) para
  const dispatch = useDispatch();
  
  useEffect(()=> {
    dispatch(getRecipes())
  },[dispatch])

  return (
    <div className={styles.homeContainer}>
        
        <h1>HOME PAGE:</h1>
        <h2>Aqui deben ir botones de filtro, de ordenamiento y de crear receta</h2>
        

        <Cards />
    </div>
  )
}

export default HomePage
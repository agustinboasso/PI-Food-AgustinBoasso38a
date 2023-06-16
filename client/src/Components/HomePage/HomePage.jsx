import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes, sortRecipes } from '../../redux/actions';
import Cards from '../Cards/Cards';
import styles from './HomePage.module.css';
import Pagination from '../Pagination/Pagination';

const HomePage = () => {
  const dispatch = useDispatch();

  const [sortOption, setSortOption] = useState('alphabetical'); // Estado del filtro seleccionado
  const [sortDirection, setSortDirection] = useState('asc'); // Estado de la dirección del ordenamiento

  useEffect(() => {
    dispatch(getRecipes()); // Llama a la acción getRecipes para obtener todas las recetas al cargar la página
  }, [dispatch]);

  useEffect(() => {
    dispatch(sortRecipes(sortOption, sortDirection)); // Llama a la acción sortRecipes para ordenar las recetas al cambiar el filtro o la dirección
  }, [dispatch, sortOption, sortDirection]);

  const handleSortOption = (option) => {
    setSortOption(option);
  };

  const handleSortDirection = (direction) => {
    setSortDirection(direction);
  };

  return (
    <div className={styles.homeContainer}>
      <h1>HOME PAGE:</h1>
      <h2>Aquí deben ir botones de filtro, de ordenamiento y de crear receta</h2>

      <div className={styles.filterDropdowns}>
        <div className={styles.filterDropdown}>
          <select value={sortOption} onChange={(e) => handleSortOption(e.target.value)}>
            <option value="alphabetical">Alphabetical</option>
            <option value="healthScore">Health Score</option>
          </select>
        </div>

        {sortOption === 'alphabetical' && (
          <div className={styles.sortDropdown}>
            <select value={sortDirection} onChange={(e) => handleSortDirection(e.target.value)}>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        )}

        {sortOption === 'healthScore' && (
          <div className={styles.sortDropdown}>
            <select value={sortDirection} onChange={(e) => handleSortDirection(e.target.value)}>
              <option value="desc">Very Healthy</option>
              <option value="asc">Poorly Healthy</option>
            </select>
          </div>
        )}
      </div>

      <Pagination />
      <Cards />
      <Pagination />
    </div>
  );
};

export default HomePage;
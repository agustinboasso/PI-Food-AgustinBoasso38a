import {useState} from "react"
import styles from './SearchBar.module.css'
import { searchRecipes,setCurrentPage } from "../../redux/actions";
import {useDispatch} from "react-redux"

const SearchBar = () => {
  const dispatch = useDispatch();
   const [id,setId]  = useState('');//xomo guardar ID

   const handleChange = (event) => {
      setId(event.target.value)//este es lo que escribo en el input
   }
   
   const handleSearch = () => {
      dispatch(setCurrentPage(1))
      dispatch(searchRecipes(id))
      
   }

   return (
      <div className={styles.searchBar}>
         <input type='search' onChange={handleChange} value={id}/> 
         <button onClick={handleSearch}>BUSCAR RECETAS</button> 
      </div>
   );
}

export default SearchBar
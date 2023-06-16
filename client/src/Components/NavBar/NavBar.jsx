import SearchBar from "../SearchBar/SearchBar"
import styles from './NavBar.module.css'
import { NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      
      <NavLink to='/home'>HOME</NavLink>
      <NavLink to='/form'>SHARE YOU RECIPE</NavLink>
      <SearchBar/>

    </div>
  )
}

export default NavBar
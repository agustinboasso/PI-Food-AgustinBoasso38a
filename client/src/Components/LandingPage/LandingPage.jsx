import styles from './LandingPage.module.css'
import {NavLink} from 'react-router-dom' 
const LandingPage = () => {
  return (
    <div className={styles.container}>
      
      
      
      <h1>Landing Page</h1>
      <NavLink to='/home'>
          <div className={styles.buttoncontainer}>
            <button className={styles.button}>GET STARTED</button>
          </div>
      </NavLink>
    </div>
  )
}

export default LandingPage
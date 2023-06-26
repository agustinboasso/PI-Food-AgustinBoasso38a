import { NavLink } from 'react-router-dom';
import styles from './Card.module.css';

const Card = (props) => {
  return (
    <div className={styles.card}>
      <NavLink to={`/detail/${props.id}`}>
        <h1>{props.name}</h1>
        <img src={props.image} alt={props.name} />
      </NavLink>
      <h2>DIET:</h2>
      
      <ul>
        {props.diet.map((diet, index) => (
          <li key={index}>{diet}</li>
        ))}
      </ul>
    </div>
  );
}

 export default Card
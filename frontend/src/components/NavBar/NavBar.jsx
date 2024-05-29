import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
      <nav>
            <Link to='/'><h2>Home</h2></Link>
            <Link to='/campaigns' style={{marginLeft: 'auto', marginRight: '40px'}}><h2>Campaigns</h2></Link>
            <Link to='/characters'><h2>Characters</h2></Link>
      </nav>
    );
  };
  
  export default NavBar;
  
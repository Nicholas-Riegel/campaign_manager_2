import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
      <nav>
            <Link to='/campaigns'>Campaigns</Link>
            <Link to='/characters'>Characters</Link>
      </nav>
    );
  };
  
  export default NavBar;
  
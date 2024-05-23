import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/campaigns">Campaigns</Link></li>
        <li><Link to="/characters">Characters</Link></li>
        <li><Link to="/places">Places</Link></li>
        <li><Link to="/dice">Dice</Link></li>
        <li><Link to="/notes">Notes</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;

import { Link } from 'react-router-dom';

const Navbar = () => (
    <div className="Navbar">
        <Link to="/">Home</Link>
      &nbsp;
        <Link to="/about">About</Link>
    </div>
);

export default Navbar;
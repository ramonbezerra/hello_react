import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from './AuthProvider';

const Navbar = () => {
  const { authed, logout } = React.useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
        {authed && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </div>
  );
}


export default Navbar;
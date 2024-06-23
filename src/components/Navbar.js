import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style/Navbar.css';
import '@fortawesome/fontawesome-free/css/all.css';

function Navbar({ isLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
  };
  const location = useLocation();
    const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link"><i className="fas fa-dumbbell"></i>Hub</Link>
        </li>
        {isLoggedIn && (
          <React.Fragment>
          {currentPath !== '/routine' && (
          <li className="nav-item">
            <Link to="/routine" className="nav-link"><i class="fas fa-sync-alt"></i>Routine</Link>
          </li>
        )}
            <li className="nav-item">
              <Link to="/create" className="nav-link"><i className="fas fa-plus"></i>Add</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i>Logout</button>
            </li>
          </React.Fragment>
        )}
        {!isLoggedIn && (
          <React.Fragment>
            <li className="nav-item">
              <Link to="/login" className="nav-link"><i className="fas fa-sign-in-alt"></i>Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link"><i className="fas fa-user-plus"></i>Signup</Link>
            </li>
          </React.Fragment>
        )}
          
      </ul>
    </nav>
  );
}

export default Navbar;

/*const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link"><i className="fas fa-dumbbell"></i>Hub</Link>
        </li>
        {isLoggedIn ? (
          <React.Fragment>
            <li className="nav-item">
              <Link to="/routine" className="nav-link"><i className="fas fa-plus"></i>Routine</Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link"><i className="fas fa-plus"></i>Add new</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i>Logout</button>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li className="nav-item">
              <Link to="/login" className="nav-link"><i className="fas fa-sign-in-alt"></i>Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link"><i className="fas fa-user-plus"></i>Signup</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;*/

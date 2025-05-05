import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">Vibe Vault</Link>
        <ul className="navbar-nav">
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/create-event" className="nav-button nav-button-primary">Create Event</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-button nav-button-outline">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-button nav-button-primary">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-button nav-button-outline">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

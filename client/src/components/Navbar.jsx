import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">Home</Link>
      <div className="nav-links">
        <Link to="/gallery">Gallery</Link>
        {user ? (
          <>
            <span>Hi {user.firstName}</span>
            <button className="btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
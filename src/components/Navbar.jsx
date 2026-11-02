import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/notes">NotDefteri✨</Link>
      </div>
      <div className="navbar-right">
        <span>Merhaba, {user?.username}</span>
        <Link to="/profile">Profil</Link>
        <button onClick={onLogout}>Çıkış</button>
      </div>
    </nav>
  );
}

export default Navbar;
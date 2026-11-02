import { useNavigate } from "react-router-dom";
import { logout } from "../Api";
import Navbar from "../components/Navbar";
import DangerZone from "../components/DangerZone";
import "../App.css";

function Profile({ user, setUser }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    setUser(null);
    navigate("/login");
  }

  return (
    <div className="page">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="content">
        <h2>Profilim</h2>

        <div className="profile-info">
          <p><strong>Kullanıcı adı:</strong> {user?.username}</p>
          <p><strong>E-posta:</strong> {user?.email}</p>
        </div>

        <DangerZone setUser={setUser} />
      </div>
    </div>
  );
}

export default Profile;
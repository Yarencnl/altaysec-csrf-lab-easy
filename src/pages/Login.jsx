import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUserStatus, resetDemo } from "../Api";
import bgImage from "../photos/csrf_background.jpg";
import "./Login.css";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserStatus("user")
      .then((data) => setStatus(data))
      .catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await login(username, password);
      setUser(data.user);
      navigate("/notes");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleReset() {
    await resetDemo();
    setStatus(null);
    setError("");
    setResetMessage("Demo sıfırlandı ✅");
    setTimeout(() => setResetMessage(""), 2500);
  }

  return (
    <div className="login-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>NotDefteri✨</h2>

        {status?.flag && (
          <p className="csrf-flag">
            🚩 Bu hesap CSRF ile silindi: {status.flag}
          </p>
        )}

        {status?.isDeleted && !status?.flag && (
          <p className="error">
            Hesap silindi.
          </p>
        )}

        <input
          type="text"
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Giriş Yap</button>
        <p className="hint">user / 1234</p>

        <button type="button" className="reset-btn" onClick={handleReset}>
          Demoyu Sıfırla
        </button>
        {resetMessage && <p className="reset-message">{resetMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
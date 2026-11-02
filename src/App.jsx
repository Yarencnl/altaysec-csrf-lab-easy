import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import { getCurrentUser } from "./Api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/notes" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/notes"
          element={user ? <Notes user={user} setUser={setUser} /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={user ? "/notes" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
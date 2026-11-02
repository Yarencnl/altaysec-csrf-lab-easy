import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotes, addNote, logout } from "../Api";
import Navbar from "../components/Navbar";
import NoteCards from "../components/NoteCards";
import "../App.css";

function Notes({ user, setUser }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNotes()
      .then((data) => setNotes(data.notes))
      .catch((err) => setError(err.message));
  }, []);

  async function handleAddNote(e) {
    e.preventDefault();
    try {
      const data = await addNote(title, content);
      setNotes(data.notes);
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLogout() {
    await logout();
    setUser(null);
    navigate("/login");
  }

  return (
    <div className="page">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="content">
        <h2>Notlarım</h2>

        {error && <p className="error">{error}</p>}

        <NoteCards notes={notes} />

        <form className="add-note-form" onSubmit={handleAddNote}>
          <h3>Yeni Not Ekle</h3>
          <input
            type="text"
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="İçerik"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Ekle</button>
        </form>
      </div>
    </div>
  );
}

export default Notes;
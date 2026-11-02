function NoteCards({ notes }) {
  if (!notes.length) {
    return <p>Henüz not yok.</p>;
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div className="note-card" key={note.id}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NoteCards;
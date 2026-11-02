import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../Api";

function DangerZone({ setUser }) {
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  async function handleDelete() {
    await deleteAccount();
    setUser(null);
    navigate("/login");
  }

  return (
    <div className="danger-zone">
      <h3>⚠️ Tehlikeli Bölge</h3>
      <p>Hesabını sildiğinde bu işlem geri alınamaz.</p>

      {!confirming ? (
        <button className="danger-btn" onClick={() => setConfirming(true)}>
          Hesabımı Sil
        </button>
      ) : (
        <div>
          <p>Emin misin?</p>
          <button className="danger-btn" onClick={handleDelete}>
            Evet, Sil
          </button>
          <button onClick={() => setConfirming(false)}>Vazgeç</button>
        </div>
      )}
    </div>
  );
}

export default DangerZone;
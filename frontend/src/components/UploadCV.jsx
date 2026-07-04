import { useState } from "react";
import { subirCV } from "../services/api";

function UploadCV({ onPerfilDetectado }) {
  const [cv, setCv] = useState(null);

  async function handleSubirCV() {
    if (!cv) {
      alert("Selecciona un CV primero");
      return;
    }

    const data = await subirCV(cv);

    if (data.perfil) {
      onPerfilDetectado(data.perfil);
    }

    alert(`✅ ${data.mensaje}`);
  }

  return (
    <div>
      <input type="file" accept=".pdf" onChange={(e) => setCv(e.target.files[0])} />
      <button onClick={handleSubirCV}>📄 Subir CV</button>
    </div>
  );
}

export default UploadCV;
import { useState } from "react";
import { subirCV } from "../services/api";

function UploadCV() {
  const [cv, setCv] = useState(null);

  async function handleSubirCV() {
    if (!cv) {
      alert("Selecciona un CV primero");
      return;
    }

    const data = await subirCV(cv);
    const perfil = data.perfil;

    alert(`✅ ${data.mensaje}

👤 Perfil detectado

Nombre: ${perfil.nombre || "No detectado"}
Profesión: ${perfil.profesion || "No detectada"}

Idiomas:
${perfil.idiomas?.join(", ") || "No detectados"}

Habilidades:
${perfil.habilidades?.join(", ") || "No detectadas"}
`);
  }

  return (
    <div>
      <input type="file" accept=".pdf" onChange={(e) => setCv(e.target.files[0])} />
      <button onClick={handleSubirCV}>📄 Subir CV</button>
    </div>
  );
}

export default UploadCV;
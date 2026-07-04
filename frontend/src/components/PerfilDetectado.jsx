function PerfilDetectado({ perfil }) {
  if (!perfil) return null;

  return (
    <div style={{
      background: "white",
      padding: "20px",
      margin: "20px auto",
      maxWidth: "700px",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,.08)"
    }}>
      <h2>👤 Perfil detectado</h2>

      <p><strong>Nombre:</strong> {perfil.nombre || "No detectado"}</p>
      <p><strong>Profesión:</strong> {perfil.profesion || "No detectada"}</p>

      <p><strong>Idiomas:</strong></p>
      <p>{perfil.idiomas?.join(", ") || "No detectados"}</p>

      <p><strong>Habilidades:</strong></p>
      <p>{perfil.habilidades?.join(", ") || "No detectadas"}</p>
    </div>
  );
}

export default PerfilDetectado;
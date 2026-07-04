function OfertaCard({ oferta, onCambiarEstado }) {
  const url = oferta.url || oferta.link || "";
  const estado = oferta.estado || "Pendiente";

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        margin: "20px auto",
        maxWidth: "900px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h2>{oferta.titulo}</h2>
      <p><strong>{oferta.empresa}</strong></p>
      <p>📍 {oferta.ubicacion || "No especificada"}</p>
      <p>🌐 Fuente: {oferta.fuente || "Manual"}</p>
      <p>📌 Estado: <strong>{estado}</strong></p>
      <p>Compatibilidad: {oferta.compatibilidad ?? 0}%</p>

      {oferta.descripcion && <p>{oferta.descripcion}</p>}

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "15px" }}>
        <button disabled={!url} onClick={() => window.open(url, "_blank")}>Ver oferta</button>
        <button onClick={() => onCambiarEstado(oferta.id, "Postulada")}>Marcar postulada</button>
        <button onClick={() => onCambiarEstado(oferta.id, "Entrevista")}>Entrevista</button>
        <button onClick={() => onCambiarEstado(oferta.id, "Descartada")}>Descartar</button>
      </div>
    </div>
  );
}

export default OfertaCard;

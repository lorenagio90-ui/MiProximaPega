function OfertaCard({ oferta }) {
  return (
    <div style={{ background: "white", padding: "20px", margin: "20px auto", maxWidth: "700px" }}>
      <h2>{oferta.titulo}</h2>
      <p><strong>{oferta.empresa}</strong></p>
      <p>📍 {oferta.ubicacion}</p>
      <p>🌐 {oferta.fuente}</p>
      <p>Compatibilidad: {oferta.compatibilidad}%</p>

      <button onClick={() => window.open(oferta.link, "_blank")}>
        Ver oferta
      </button>
    </div>
  );
}

export default OfertaCard;
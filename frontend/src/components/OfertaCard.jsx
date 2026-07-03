function OfertaCard({ oferta }) {
  const color =
    oferta.compatibilidad >= 90
      ? "#22c55e"
      : oferta.compatibilidad >= 75
      ? "#f59e0b"
      : "#ef4444";

  async function analizarIA() {
    const res = await fetch("http://127.0.0.1:8000/analizar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(oferta),
    });

    const data = await res.json();

    alert(`🤖 MiPróximaPega IA

${data.resumen}

💪 Fortalezas:
${data.fortalezas.join(", ") || "No detectadas"}

📈 Puedes mejorar:
${data.faltantes.join(", ") || "No detectadas"}

💡 Consejo:
${data.consejo}`);
  }

  return (
    <div
      style={{
        background: "white",
        maxWidth: "750px",
        margin: "20px auto",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h2>{oferta.titulo}</h2>

      <h3>{oferta.empresa}</h3>

      <p>📍 {oferta.ubicacion}</p>

      <p>🌐 {oferta.fuente}</p>

      <div
        style={{
          height: "12px",
          background: "#ddd",
          borderRadius: "30px",
          overflow: "hidden",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            width: `${oferta.compatibilidad}%`,
            height: "100%",
            background: color,
          }}
        />
      </div>

      <p>
        <strong>Compatibilidad:</strong> {oferta.compatibilidad}%
      </p>

      {oferta.fortalezas?.length > 0 && (
        <>
          <strong>Fortalezas</strong>
          <ul>
            {oferta.fortalezas.map((f, i) => (
              <li key={i}>✅ {f}</li>
            ))}
          </ul>
        </>
      )}

      {oferta.faltantes?.length > 0 && (
        <>
          <strong>Podrías reforzar</strong>
          <ul>
            {oferta.faltantes.map((f, i) => (
              <li key={i}>⚠ {f}</li>
            ))}
          </ul>
        </>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button onClick={() => window.open(oferta.link, "_blank")}>
          🌐 Ver oferta
        </button>

        <button onClick={analizarIA}>
          🤖 Analizar con IA
        </button>

        <button onClick={() => alert("Próximamente favoritos ⭐")}>
          ⭐ Favorito
        </button>
      </div>
    </div>
  );
}

export default OfertaCard;
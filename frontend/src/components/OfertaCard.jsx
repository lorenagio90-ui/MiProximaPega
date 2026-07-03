import { useState } from "react";

function OfertaCard({ oferta }) {
  const [mostrarIA, setMostrarIA] = useState(false);
  const [analizando, setAnalizando] = useState(false);

  const color =
    oferta.compatibilidad >= 90
      ? "#22c55e"
      : oferta.compatibilidad >= 80
      ? "#f59e0b"
      : "#ef4444";

  function analizarOferta() {
    setAnalizando(true);
    setMostrarIA(false);

    setTimeout(() => {
      setAnalizando(false);
      setMostrarIA(true);
    }, 1800);
  }

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "20px",
        boxShadow: "0 3px 10px rgba(0,0,0,.08)",
        maxWidth: "700px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2>{oferta.titulo}</h2>
      <p><strong>{oferta.empresa}</strong></p>
      <p>📍 {oferta.ubicacion}</p>
      <p>🌐 {oferta.fuente}</p>

      <div
        style={{
          height: "12px",
          background: "#ddd",
          borderRadius: "10px",
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

      <p>Compatibilidad: <strong>{oferta.compatibilidad}%</strong></p>

      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button
          onClick={() => window.open(oferta.link, "_blank")}
          style={{
            background: "#2563EB",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Ver oferta
        </button>

        <button
          onClick={analizarOferta}
          style={{
            background: "#7C3AED",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🤖 Analizar con IA
        </button>
      </div>

      {analizando && (
        <div
          style={{
            marginTop: "20px",
            background: "#F5F3FF",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          ⏳ Analizando compatibilidad con IA...
        </div>
      )}

      {mostrarIA && (
        <div
          style={{
            marginTop: "20px",
            background: "#EEF2FF",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #C7D2FE",
          }}
        >
          <h3>🧠 Análisis IA</h3>

          <p><strong>Fortalezas</strong></p>
          <ul>
            <li>✅ Experiencia logística</li>
            <li>✅ Inglés B2</li>
            <li>✅ Gestión comercial</li>
          </ul>

          <p><strong>Podrías reforzar</strong></p>
          <ul>
            <li>📈 Salesforce</li>
            <li>📊 Power BI</li>
          </ul>

          <p><strong>Recomendación</strong></p>
          <p>
            Tu perfil tiene muy buena compatibilidad con esta vacante.
            Conviene adaptar el CV destacando logística, clientes B2B y gestión comercial.
          </p>
        </div>
      )}
    </div>
  );
}

export default OfertaCard;
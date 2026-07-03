import { useEffect, useState } from "react";

function App() {
  const [ofertas, setOfertas] = useState([]);
  const [busqueda, setBusqueda] = useState("KAM");
  const [ultimaBusqueda, setUltimaBusqueda] = useState("KAM");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  function buscar() {
    setError("");
    setCargando(true);
    setUltimaBusqueda(busqueda);

    fetch(`http://127.0.0.1:8000/buscar?cargo=${encodeURIComponent(busqueda)}`)
      .then((res) => res.json())
      .then((data) => setOfertas(data))
      .catch((error) => {
        console.error(error);
        setError("No se pudo conectar con el backend.");
      })
      .finally(() => setCargando(false));
  }

  useEffect(() => {
    buscar();
  }, []);

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh", padding: "24px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", color: "#2563EB", fontSize: "42px" }}>
        🚀 MiPróximaPega
      </h1>

      <h2 style={{ textAlign: "center", color: "#555", marginBottom: "30px" }}>
        Tu copiloto inteligente para encontrar trabajo
      </h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") buscar();
          }}
          placeholder="Buscar cargo..."
          style={{
            width: "100%",
            maxWidth: "380px",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          onClick={buscar}
          style={{
            padding: "12px 24px",
            borderRadius: "10px",
            background: "#2563EB",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🔍 Buscar
        </button>
      </div>

      <hr style={{ marginTop: "40px", marginBottom: "30px" }} />

      {error && <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>{error}</p>}

      <h2 style={{ textAlign: "center", color: "#333" }}>
        Resultados para "{ultimaBusqueda}"
      </h2>

      {cargando ? (
        <p style={{ textAlign: "center", color: "#666" }}>⏳ Buscando ofertas...</p>
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>
          {ofertas.length} oferta{ofertas.length === 1 ? "" : "s"} encontrada
          {ofertas.length === 1 ? "" : "s"}
        </p>
      )}

      {!cargando && ofertas.length === 0 && (
        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          marginTop: "20px",
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}>
          <h2>😕 No encontré ofertas</h2>
          <p>Prueba con otro cargo, por ejemplo: KAM, Customer o Ejecutivo.</p>
        </div>
      )}

      {ofertas.map((oferta, index) => (
        <div key={index} style={{
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          marginTop: "20px",
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}>
          <h2>{oferta.titulo}</h2>
          <p><strong>{oferta.empresa}</strong></p>
          <p>📍 {oferta.ubicacion}</p>
          <p>🌐 {oferta.fuente}</p>

          <div style={{
            height: "10px",
            background: "#ddd",
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "15px",
            marginBottom: "10px",
          }}>
            <div style={{
              width: `${oferta.compatibilidad}%`,
              height: "100%",
              background: "#22c55e",
            }} />
          </div>

          <p>Compatibilidad: <strong>{oferta.compatibilidad}%</strong></p>

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
        </div>
      ))}
    </div>
  );
}

export default App;
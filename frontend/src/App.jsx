import { useEffect, useMemo, useState } from "react";
import OfertaCard from "./components/OfertaCard";
import UploadCV from "./components/UploadCV";
import PerfilDetectado from "./components/PerfilDetectado";
import Dashboard from "./components/dashboard/Dashboard";
import { actualizarOferta, buscarOfertas } from "./services/api";

function App() {
  const [ofertas, setOfertas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function cargarOfertas() {
    try {
      setCargando(true);
      setError("");
      const data = await buscarOfertas();
      setOfertas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("ERROR AL CARGAR OFERTAS:", err);
      setError(`No pude conectar con el backend: ${err.message}`);
      setOfertas([]);
    } finally {
      setCargando(false);
    }
  }

  async function cambiarEstadoOferta(id, estado) {
    try {
      await actualizarOferta(id, { estado });
      await cargarOfertas();
    } catch (err) {
      console.error("ERROR AL ACTUALIZAR OFERTA:", err);
      alert(`No se pudo actualizar la oferta: ${err.message}`);
    }
  }

  useEffect(() => {
    cargarOfertas();
  }, []);

  const ofertasFiltradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return ofertas;

    return ofertas.filter((oferta) => {
      const titulo = oferta.titulo?.toLowerCase() || "";
      const empresa = oferta.empresa?.toLowerCase() || "";
      const ubicacion = oferta.ubicacion?.toLowerCase() || "";
      const estado = oferta.estado?.toLowerCase() || "";
      const fuente = oferta.fuente?.toLowerCase() || "";

      return (
        titulo.includes(texto) ||
        empresa.includes(texto) ||
        ubicacion.includes(texto) ||
        estado.includes(texto) ||
        fuente.includes(texto)
      );
    });
  }, [busqueda, ofertas]);

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh", padding: "30px", fontFamily: "Arial" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1>🚀 MiPróximaPega</h1>
        <p>Tu copiloto inteligente para encontrar trabajo</p>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px", marginBottom: "20px" }}>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por cargo, empresa, ciudad o estado"
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />

          <button onClick={cargarOfertas} style={{ padding: "12px 18px", borderRadius: "10px" }}>
            🔄 Actualizar
          </button>
        </div>

        <UploadCV onPerfilDetectado={setPerfil} />
        <PerfilDetectado perfil={perfil} />
        <Dashboard total={ofertas.length} />

        <h2>Ofertas encontradas: {ofertasFiltradas.length}</h2>

        {cargando && <p>Cargando ofertas...</p>}

        {error && (
          <div style={{ background: "#ffe5e5", padding: "15px", borderRadius: "10px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        {!cargando && ofertasFiltradas.length === 0 && !error && (
          <p>No hay ofertas para mostrar todavía.</p>
        )}

        {ofertasFiltradas.map((oferta) => (
          <OfertaCard
            key={oferta.id}
            oferta={oferta}
            onCambiarEstado={cambiarEstadoOferta}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

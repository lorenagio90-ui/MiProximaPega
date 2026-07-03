import { useEffect, useState } from "react";
import OfertaCard from "./components/OfertaCard";
import UploadCV from "./components/UploadCV";
import Dashboard from "./components/dashboard/Dashboard";
import { buscarOfertas } from "./services/api";

function App() {
  const [ofertas, setOfertas] = useState([]);
  const [busqueda, setBusqueda] = useState("KAM");

  async function buscar() {
    const data = await buscarOfertas(busqueda);
    setOfertas(data);
  }

  useEffect(() => {
    buscar();
  }, []);

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh", padding: "30px", fontFamily: "Arial" }}>
      <h1>🚀 MiPróximaPega</h1>
      <p>Tu copiloto inteligente para encontrar trabajo</p>

      <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      <button onClick={buscar}>🔍 Buscar</button>

      <UploadCV />

      <Dashboard total={ofertas.length} />

      <h2>Ofertas encontradas: {ofertas.length}</h2>

      {ofertas.map((oferta, index) => (
        <OfertaCard key={index} oferta={oferta} />
      ))}
    </div>
  );
}

export default App;
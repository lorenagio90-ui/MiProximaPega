import { useEffect, useState } from "react";
import OfertaCard from "./components/OfertaCard";

function App() {
  const [ofertas, setOfertas] = useState([]);
  const [busqueda, setBusqueda] = useState("KAM");
  const [ultimaBusqueda, setUltimaBusqueda] = useState("KAM");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [cv, setCv] = useState(null);

  function buscar() {
    setError("");
    setCargando(true);
    setUltimaBusqueda(busqueda);

    fetch(`http://127.0.0.1:8000/buscar?cargo=${encodeURIComponent(busqueda)}`)
      .then((res) => res.json())
      .then((data) => setOfertas(data))
      .catch(() => setError("No se pudo conectar con el backend."))
      .finally(() => setCargando(false));
  }

  async function subirCV() {
    if (!cv) {
      alert("Selecciona un CV en PDF primero");
      return;
    }

    const formData = new FormData();
    formData.append("file", cv);

    const res = await fetch("http://127.0.0.1:8000/subir-cv", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.mensaje);
  }

  useEffect(() => {
    buscar();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-8 font-sans">
      <h1 className="text-center text-5xl font-bold text-blue-600">
        🚀 MiPróximaPega
      </h1>

      <h2 className="mt-3 text-center text-xl text-slate-600">
        Tu copiloto inteligente para encontrar trabajo
      </h2>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") buscar();
          }}
          placeholder="Buscar cargo..."
          className="w-full max-w-md rounded-xl border border-slate-300 px-4 py-3 text-base"
        />

        <button
          onClick={buscar}
          className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
        >
          🔍 Buscar
        </button>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setCv(e.target.files[0])}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3"
        />

        <button
          onClick={subirCV}
          className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
        >
          📄 Subir CV
        </button>
      </div>

      <hr className="my-8" />

      {error && <p className="text-center font-bold text-red-600">{error}</p>}

      <h2 className="text-center text-2xl font-bold text-slate-800">
        Resultados para "{ultimaBusqueda}"
      </h2>

      {cargando ? (
        <p className="mt-4 text-center text-slate-600">⏳ Buscando ofertas...</p>
      ) : (
        <p className="mt-2 text-center text-slate-600">
          {ofertas.length} oferta{ofertas.length === 1 ? "" : "s"} encontrada
          {ofertas.length === 1 ? "" : "s"}
        </p>
      )}

      {!cargando && ofertas.length === 0 && (
        <div className="mx-auto mt-6 max-w-2xl rounded-2xl bg-white p-6 text-center shadow">
          <h2 className="text-2xl font-bold">😕 No encontré ofertas</h2>
          <p className="mt-2 text-slate-600">
            Prueba con otro cargo, por ejemplo: KAM, Customer o Ejecutivo.
          </p>
        </div>
      )}

      {ofertas.map((oferta, index) => (
        <OfertaCard key={index} oferta={oferta} />
      ))}
    </div>
  );
}

export default App;
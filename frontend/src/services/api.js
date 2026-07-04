const API_URL = "http://127.0.0.1:8000";

export async function buscarOfertas() {
  const res = await fetch(`${API_URL}/jobs`);

  if (!res.ok) {
    throw new Error(`No fue posible obtener las ofertas. Estado HTTP: ${res.status}`);
  }

  return await res.json();
}

export async function actualizarOferta(id, datos) {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  if (!res.ok) {
    throw new Error(`No fue posible actualizar la oferta. Estado HTTP: ${res.status}`);
  }

  return await res.json();
}

export async function subirCV(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/subir-cv`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`No fue posible subir el CV. Estado HTTP: ${res.status}`);
  }

  return await res.json();
}

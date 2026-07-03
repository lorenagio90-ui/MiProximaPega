const API_URL = "http://127.0.0.1:8000";

export async function buscarOfertas(cargo) {
  const res = await fetch(`${API_URL}/buscar?cargo=${encodeURIComponent(cargo)}`);
  return await res.json();
}

export async function subirCV(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/subir-cv`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
}
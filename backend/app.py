from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from services.buscador import buscar
from services.cv_reader import leer_cv
from database.db import init_db, guardar_ofertas, listar_ofertas

app = FastAPI(title="MiProximaPega API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()


@app.get("/")
def home():
    return {
        "app": "MiProximaPega",
        "status": "activo",
        "version": "0.4"
    }


@app.get("/buscar")
def buscar_ofertas(cargo: str = "KAM"):

    resultados = buscar(cargo)

    guardar_ofertas(resultados)

    return resultados


@app.get("/historial")
def historial():

    return listar_ofertas()


@app.post("/analizar")
def analizar(oferta: dict):

    return {
        "resumen": f"El cargo '{oferta['titulo']}' parece compatible con un perfil orientado a gestión comercial, clientes y operaciones.",

        "fortalezas": oferta.get("fortalezas", []),

        "faltantes": oferta.get("faltantes", []),

        "consejo": "Destaca en tu CV tus logros en logística, atención de clientes y mejora de procesos."
    }


@app.post("/subir-cv")
async def async function subirCV() {
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

  console.log(data.texto);

  alert(`✅ ${data.mensaje}

Ya leímos tu CV correctamente.

Abre la consola del navegador (F12) para ver el texto extraído.`);
}

    return {
        "mensaje": "CV leído correctamente",

        "archivo": file.filename,

        "texto": texto[:2000]
    }
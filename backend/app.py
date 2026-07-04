from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from services.buscador import buscar
from services.cv_reader import leer_cv
from ai.perfil import generar_perfil
from database.db import init_db, guardar_ofertas, listar_ofertas

app = FastAPI(title="MiProximaPega API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()


@app.get("/")
def home():
    return {"app": "MiProximaPega", "status": "activo", "version": "0.6"}


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
async def subir_cv(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)

    ruta = f"uploads/{file.filename}"

    with open(ruta, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    texto = leer_cv(ruta)
    perfil = generar_perfil(texto)

    return {
        "mensaje": "CV leído y perfil generado correctamente",
        "archivo": file.filename,
        "perfil": perfil
    }
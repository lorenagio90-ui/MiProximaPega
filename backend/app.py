from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.buscador import buscar
from database.db import init_db, guardar_ofertas, listar_ofertas

app = FastAPI(title="MiProximaPega API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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
        "version": "0.2"
    }


@app.get("/buscar")
def buscar_ofertas(cargo: str = "KAM"):
    resultados = buscar(cargo)
    guardar_ofertas(resultados)
    return resultados


@app.get("/historial")
def historial():
    return listar_ofertas()
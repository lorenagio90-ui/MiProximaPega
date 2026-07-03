from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scrapers.linkedin import buscar_linkedin

app = FastAPI(title="MiProximoTrabajo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "app": "MiProximoTrabajo",
        "status": "activo"
    }


@app.get("/buscar")
def buscar(cargo: str = "KAM"):
    return buscar_linkedin(cargo)
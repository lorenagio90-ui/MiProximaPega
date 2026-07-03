from fastapi import FastAPI

app = FastAPI(title="MiProximoTrabajo API")

@app.get("/")
def home():
    return {
        "app": "MiProximoTrabajo",
        "status": "activo",
        "version": "0.1"
    }

@app.get("/ofertas")
def obtener_ofertas():
    return [
        {
            "titulo": "KAM Logístico",
            "empresa": "Empresa Demo",
            "ubicacion": "Santiago",
            "compatibilidad": 92
        },
        {
            "titulo": "Ejecutivo Comercial",
            "empresa": "Retail Demo",
            "ubicacion": "Valparaíso",
            "compatibilidad": 85
        }
    ]

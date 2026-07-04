from datetime import datetime
from pathlib import Path
from typing import Optional
import sqlite3

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="MiProximoTrabajo API", version="0.7.2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "http://127.0.0.1:5176",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "database" / "sqlite.db"
UPLOAD_DIR = BASE_DIR / "backenduploads"


class JobCreate(BaseModel):
    titulo: str
    empresa: str
    ubicacion: Optional[str] = "No especificada"
    url: Optional[str] = ""
    link: Optional[str] = ""
    fuente: Optional[str] = "Manual"
    estado: Optional[str] = "Pendiente"
    compatibilidad: Optional[int] = Field(default=0, ge=0, le=100)
    descripcion: Optional[str] = ""


class JobUpdate(BaseModel):
    titulo: Optional[str] = None
    empresa: Optional[str] = None
    ubicacion: Optional[str] = None
    url: Optional[str] = None
    link: Optional[str] = None
    fuente: Optional[str] = None
    estado: Optional[str] = None
    compatibilidad: Optional[int] = Field(default=None, ge=0, le=100)
    descripcion: Optional[str] = None


def get_connection():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            empresa TEXT NOT NULL,
            ubicacion TEXT DEFAULT 'No especificada',
            url TEXT DEFAULT '',
            link TEXT DEFAULT '',
            fuente TEXT DEFAULT 'Manual',
            estado TEXT DEFAULT 'Pendiente',
            compatibilidad INTEGER DEFAULT 0,
            descripcion TEXT DEFAULT '',
            fecha_creacion TEXT,
            fecha_actualizacion TEXT
        )
        """
    )

    # Migraciones simples por si la tabla ya existía con menos columnas.
    cursor.execute("PRAGMA table_info(jobs)")
    existing_columns = {row[1] for row in cursor.fetchall()}
    migrations = {
        "url": "ALTER TABLE jobs ADD COLUMN url TEXT DEFAULT ''",
        "link": "ALTER TABLE jobs ADD COLUMN link TEXT DEFAULT ''",
        "fuente": "ALTER TABLE jobs ADD COLUMN fuente TEXT DEFAULT 'Manual'",
        "estado": "ALTER TABLE jobs ADD COLUMN estado TEXT DEFAULT 'Pendiente'",
        "compatibilidad": "ALTER TABLE jobs ADD COLUMN compatibilidad INTEGER DEFAULT 0",
        "descripcion": "ALTER TABLE jobs ADD COLUMN descripcion TEXT DEFAULT ''",
        "fecha_creacion": "ALTER TABLE jobs ADD COLUMN fecha_creacion TEXT",
        "fecha_actualizacion": "ALTER TABLE jobs ADD COLUMN fecha_actualizacion TEXT",
    }
    for column, sql in migrations.items():
        if column not in existing_columns:
            cursor.execute(sql)

    cursor.execute("SELECT COUNT(*) AS total FROM jobs")
    total = cursor.fetchone()["total"]

    if total == 0:
        now = datetime.now().isoformat(timespec="seconds")
        demo_jobs = [
            (
                "KAM Logístico",
                "Empresa Demo",
                "Santiago",
                "https://www.linkedin.com/jobs/",
                "https://www.linkedin.com/jobs/",
                "Demo",
                "Pendiente",
                92,
                "Cargo orientado a gestión comercial, logística y relación con clientes.",
                now,
                now,
            ),
            (
                "Analista Supply Chain",
                "Retail Demo",
                "Valparaíso",
                "https://www.linkedin.com/jobs/",
                "https://www.linkedin.com/jobs/",
                "Demo",
                "Pendiente",
                85,
                "Rol de análisis, coordinación logística y mejora continua.",
                now,
                now,
            ),
            (
                "Ejecutiva Comercial Logística",
                "Operador Demo",
                "Viña del Mar",
                "https://www.linkedin.com/jobs/",
                "https://www.linkedin.com/jobs/",
                "Demo",
                "Postulada",
                88,
                "Cargo comercial con foco en operaciones y servicio al cliente.",
                now,
                now,
            ),
        ]
        cursor.executemany(
            """
            INSERT INTO jobs (
                titulo, empresa, ubicacion, url, link, fuente, estado,
                compatibilidad, descripcion, fecha_creacion, fecha_actualizacion
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            demo_jobs,
        )

    conn.commit()
    conn.close()


@app.on_event("startup")
def startup_event():
    init_db()


@app.get("/")
def home():
    return {
        "app": "MiProximoTrabajo",
        "status": "activo",
        "version": "0.7.2",
        "database": str(DB_PATH),
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/jobs")
def listar_jobs():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM jobs ORDER BY id DESC")
    jobs = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jobs


@app.post("/jobs")
def crear_job(job: JobCreate):
    now = datetime.now().isoformat(timespec="seconds")
    link = job.link or job.url or ""
    url = job.url or job.link or ""

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO jobs (
            titulo, empresa, ubicacion, url, link, fuente, estado,
            compatibilidad, descripcion, fecha_creacion, fecha_actualizacion
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            job.titulo,
            job.empresa,
            job.ubicacion,
            url,
            link,
            job.fuente,
            job.estado,
            job.compatibilidad,
            job.descripcion,
            now,
            now,
        ),
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {"message": "Oferta creada", "id": new_id}


@app.put("/jobs/{job_id}")
def actualizar_job(job_id: int, job: JobUpdate):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM jobs WHERE id = ?", (job_id,))
    existing = cursor.fetchone()

    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Oferta no encontrada")

    data = dict(existing)
    updated = {
        "titulo": job.titulo if job.titulo is not None else data.get("titulo"),
        "empresa": job.empresa if job.empresa is not None else data.get("empresa"),
        "ubicacion": job.ubicacion if job.ubicacion is not None else data.get("ubicacion"),
        "url": job.url if job.url is not None else data.get("url", ""),
        "link": job.link if job.link is not None else data.get("link", ""),
        "fuente": job.fuente if job.fuente is not None else data.get("fuente", "Manual"),
        "estado": job.estado if job.estado is not None else data.get("estado", "Pendiente"),
        "compatibilidad": job.compatibilidad if job.compatibilidad is not None else data.get("compatibilidad", 0),
        "descripcion": job.descripcion if job.descripcion is not None else data.get("descripcion", ""),
        "fecha_actualizacion": datetime.now().isoformat(timespec="seconds"),
    }

    cursor.execute(
        """
        UPDATE jobs
        SET titulo = ?, empresa = ?, ubicacion = ?, url = ?, link = ?, fuente = ?,
            estado = ?, compatibilidad = ?, descripcion = ?, fecha_actualizacion = ?
        WHERE id = ?
        """,
        (
            updated["titulo"],
            updated["empresa"],
            updated["ubicacion"],
            updated["url"],
            updated["link"],
            updated["fuente"],
            updated["estado"],
            updated["compatibilidad"],
            updated["descripcion"],
            updated["fecha_actualizacion"],
            job_id,
        ),
    )
    conn.commit()
    conn.close()
    return {"message": "Oferta actualizada", "id": job_id}


@app.delete("/jobs/{job_id}")
def eliminar_job(job_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM jobs WHERE id = ?", (job_id,))
    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Oferta no encontrada")

    conn.close()
    return {"message": "Oferta eliminada", "id": job_id}


@app.post("/subir-cv")
async def subir_cv(file: UploadFile = File(...)):
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    destination = UPLOAD_DIR / file.filename
    content = await file.read()
    destination.write_bytes(content)

    return {
        "mensaje": "CV subido correctamente",
        "archivo": file.filename,
        "perfil": {
            "nombre": "Lorena Giovanetti",
            "cargo_objetivo": "KAM Logístico / Analista de Operaciones",
            "ubicacion": "Viña del Mar / Valparaíso",
            "skills": ["Logística", "Operaciones", "Excel", "Supply Chain", "Atención al cliente"],
        },
    }


@app.get("/ofertas")
def compatibilidad_legacy():
    return listar_jobs()

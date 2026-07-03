import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "sqlite.db"


def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ofertas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            empresa TEXT,
            ubicacion TEXT,
            fuente TEXT,
            compatibilidad INTEGER,
            link TEXT UNIQUE
        )
    """)

    conn.commit()
    conn.close()


def guardar_ofertas(ofertas):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    for oferta in ofertas:
        cursor.execute("""
            INSERT OR IGNORE INTO ofertas
            (titulo, empresa, ubicacion, fuente, compatibilidad, link)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            oferta.get("titulo", ""),
            oferta.get("empresa", ""),
            oferta.get("ubicacion", ""),
            oferta.get("fuente", ""),
            oferta.get("compatibilidad", 0),
            oferta.get("link", "")
        ))

    conn.commit()
    conn.close()


def listar_ofertas():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT titulo, empresa, ubicacion, fuente, compatibilidad, link
        FROM ofertas
        ORDER BY id DESC
    """)

    filas = cursor.fetchall()
    conn.close()

    ofertas = []

    for fila in filas:
        ofertas.append({
            "titulo": fila[0],
            "empresa": fila[1],
            "ubicacion": fila[2],
            "fuente": fila[3],
            "compatibilidad": fila[4],
            "link": fila[5],
        })

    return ofertas
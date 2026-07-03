import requests
from bs4 import BeautifulSoup
from urllib.parse import quote_plus


def buscar_chiletrabajos(cargo):
    url = f"https://www.chiletrabajos.cl/encuentra-un-empleo/?2={quote_plus(cargo)}&filterSearch=Buscar"

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers, timeout=15)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    ofertas = []

    links = soup.find_all("a", href=True)

    for link in links:
        texto = link.get_text(strip=True)
        href = link["href"]

        if not texto:
            continue

        if "/trabajo/" not in href:
            continue

        ofertas.append({
            "titulo": texto,
            "empresa": "ChileTrabajos",
            "ubicacion": "Chile",
            "fuente": "ChileTrabajos",
            "compatibilidad": 80,
            "link": href if href.startswith("http") else f"https://www.chiletrabajos.cl{href}"
        })

        if len(ofertas) >= 10:
            break

    return ofertas
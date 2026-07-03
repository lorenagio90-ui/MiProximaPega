PALABRAS_CLAVE_USUARIO = [
    "kam",
    "logística",
    "logistico",
    "comercial",
    "cliente",
    "clientes",
    "excel",
    "inglés",
    "supply chain",
    "comercio exterior",
    "operaciones",
    "customer success",
]

HABILIDADES_FALTANTES = [
    "power bi",
    "salesforce",
    "sap",
    "sql",
]


def analizar_oferta(oferta):
    texto = (
        f"{oferta.get('titulo', '')} "
        f"{oferta.get('empresa', '')}"
    ).lower()

    puntaje = 50

    fortalezas = []
    faltantes = []

    for palabra in PALABRAS_CLAVE_USUARIO:
        if palabra in texto:
            puntaje += 8
            fortalezas.append(palabra.title())

    for habilidad in HABILIDADES_FALTANTES:
        if habilidad in texto:
            faltantes.append(habilidad.title())

    if "junior" in texto:
        puntaje -= 20

    if "práctica" in texto:
        puntaje -= 40

    puntaje = max(0, min(100, puntaje))

    return {
        "compatibilidad": puntaje,
        "fortalezas": fortalezas,
        "faltantes": faltantes,
    }

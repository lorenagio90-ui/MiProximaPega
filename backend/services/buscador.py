from scrapers.linkedin import buscar_linkedin
from scrapers.chiletrabajos import buscar_chiletrabajos
from scrapers.laborum import buscar_laborum
from scrapers.trabajando import buscar_trabajando

from services.compatibilidad import analizar_oferta


def eliminar_duplicados(ofertas):
    vistas = set()
    resultado = []

    for oferta in ofertas:
        link = oferta.get("link", "")

        if link not in vistas:
            vistas.add(link)
            resultado.append(oferta)

    return resultado


def buscar(cargo):

    resultados = []

    scrapers = [
        buscar_linkedin,
        buscar_chiletrabajos,
        buscar_laborum,
        buscar_trabajando,
    ]

    for scraper in scrapers:
        try:
            resultados.extend(scraper(cargo))
        except Exception as e:
            print(e)

    resultados = eliminar_duplicados(resultados)

    for oferta in resultados:

        analisis = analizar_oferta(oferta)

        oferta["compatibilidad"] = analisis["compatibilidad"]
        oferta["fortalezas"] = analisis["fortalezas"]
        oferta["faltantes"] = analisis["faltantes"]

    resultados.sort(
        key=lambda x: x["compatibilidad"],
        reverse=True,
    )

    return resultados
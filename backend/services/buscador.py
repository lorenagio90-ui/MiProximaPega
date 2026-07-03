from scrapers.linkedin import buscar_linkedin
from scrapers.chiletrabajos import buscar_chiletrabajos


def buscar(cargo):
    resultados = []

    resultados.extend(buscar_linkedin(cargo))

    try:
        resultados.extend(buscar_chiletrabajos(cargo))
    except Exception as e:
        print("Error buscando en ChileTrabajos:", e)

    return resultados
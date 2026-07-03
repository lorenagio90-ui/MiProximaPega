import re


def generar_perfil(texto):

    perfil = {
        "nombre": "",
        "profesion": "",
        "idiomas": [],
        "habilidades": [],
        "texto": texto
    }

    lineas = texto.split("\n")

    if len(lineas) > 0:
        perfil["nombre"] = lineas[0].strip()

    profesiones = [
        "Ingeniera Comercial",
        "Ingeniero Comercial",
        "Ingeniero Civil",
        "Abogada",
        "Abogado",
        "Contador",
        "Psicóloga",
        "Psicólogo"
    ]

    for p in profesiones:
        if p.lower() in texto.lower():
            perfil["profesion"] = p

    habilidades = [
        "Excel",
        "Power BI",
        "SAP",
        "Qlik",
        "Python",
        "CRM",
        "SQL"
    ]

    for h in habilidades:
        if h.lower() in texto.lower():
            perfil["habilidades"].append(h)

    idiomas = [
        "Inglés",
        "English",
        "B2",
        "C1"
    ]

    for i in idiomas:
        if i.lower() in texto.lower():
            perfil["idiomas"].append(i)

    return perfil
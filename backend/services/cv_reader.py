from pypdf import PdfReader


def leer_cv(ruta):
    reader = PdfReader(ruta)

    texto = ""

    for pagina in reader.pages:
        contenido = pagina.extract_text()

        if contenido:
            texto += contenido + "\n"

    return texto
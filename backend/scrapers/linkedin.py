def buscar_linkedin(cargo):

    datos = [
        {
            "titulo": "KAM Logístico",
            "empresa": "Demo LinkedIn",
            "ubicacion": "Santiago",
            "fuente": "LinkedIn",
            "compatibilidad": 92,
            "link": "https://linkedin.com/jobs"
        },
        {
            "titulo": "Customer Success",
            "empresa": "Empresa Tech",
            "ubicacion": "Remoto",
            "fuente": "LinkedIn",
            "compatibilidad": 88,
            "link": "https://linkedin.com/jobs"
        },
        {
            "titulo": "Ejecutivo Comercial",
            "empresa": "Retail",
            "ubicacion": "Valparaíso",
            "fuente": "LinkedIn",
            "compatibilidad": 81,
            "link": "https://linkedin.com/jobs"
        }
    ]

    cargo = cargo.lower()

    return [
        oferta
        for oferta in datos
        if cargo in oferta["titulo"].lower()
    ]
  
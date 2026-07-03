def buscar_linkedin(cargo):
    datos = [
        {
            "titulo": "KAM Logístico",
            "empresa": "Demo LinkedIn",
            "ubicacion": "Santiago",
            "fuente": "LinkedIn",
            "compatibilidad": 92,
            "link": "https://www.linkedin.com/jobs/search/?keywords=KAM%20Log%C3%ADstico&location=Chile"
        },
        {
            "titulo": "Customer Success",
            "empresa": "Empresa Tech",
            "ubicacion": "Remoto",
            "fuente": "LinkedIn",
            "compatibilidad": 88,
            "link": "https://www.linkedin.com/jobs/search/?keywords=Customer%20Success&location=Chile"
        },
        {
            "titulo": "Ejecutivo Comercial",
            "empresa": "Retail",
            "ubicacion": "Valparaíso",
            "fuente": "LinkedIn",
            "compatibilidad": 81,
            "link": "https://www.linkedin.com/jobs/search/?keywords=Ejecutivo%20Comercial&location=Chile"
        }
    ]

    cargo = cargo.lower()

    return [
        oferta
        for oferta in datos
        if cargo in oferta["titulo"].lower()
    ]
  
-- Pilarica · Secciones editables adicionales (valores, equipo, contacto, redes)
-- Ejecutar después de site-content.sql

insert into site_content (section_key, data) values
  ('values', '{
    "titleHtml": "Los pilares de <em>Pilarica</em>",
    "items": [
      {"icon": "star", "title": "Autenticidad", "desc": "Cada pieza incluye su certificado personal. Materiales nobles, sin compromisos."},
      {"icon": "shield", "title": "Garantía real", "desc": "Respaldamos cada joya. Si algo no está perfecto, lo resolvemos sin preguntas."},
      {"icon": "heart", "title": "Diseño con alma", "desc": "Clásicos que perduran y modernos que sorprenden. Nunca genéricos."},
      {"icon": "tag", "title": "Precio justo", "desc": "Sin intermediarios, sin márgenes inflados. Lujo democrático, siempre."}
    ]
  }'::jsonb),
  ('team', '{
    "eyebrow": "Quiénes somos",
    "titleHtml": "El corazón<br/>de <em>Pilarica</em>",
    "members": [
      {
        "name": "Pilar Rodríguez",
        "role": "Fundadora & Directora Creativa",
        "bio": "Con más de 15 años en la industria joyera, Pilar fundó la marca con la visión de acercar la alta joyería a quienes la aprecian de verdad. Cada colección nace de su pasión por el diseño clásico y la excelencia en materiales.",
        "initials": "PR"
      }
    ]
  }'::jsonb),
  ('locations', '{
    "eyebrow": "Encuéntranos",
    "titleHtml": "Visítanos o<br/><em>escríbenos</em>",
    "items": [
      {
        "id": "loc-01",
        "name": "Pilarica - Boutique Principal",
        "address": "Showroom en Cancún y Tuxtla Gutiérrez con cita",
        "city": "",
        "cp": "",
        "phone": "+52 (961) 155 5744",
        "whatsapp": "529611555744",
        "email": "mrk@pilaricajoyas.com.mx",
        "hours": [
          {"days": "Lunes - Viernes", "time": "10:00 - 20:00"},
          {"days": "Sábado", "time": "10:00 - 18:00"},
          {"days": "Domingo", "time": "Con cita previa"}
        ],
        "mapUrl": "https://maps.google.com/?q=Cancun+Zona+Hotelera"
      }
    ]
  }'::jsonb),
  ('social', '{
    "eyebrow": "Comunidad",
    "titleHtml": "Unete a nuestra<br/><em>comunidad</em>",
    "body": "Inspiración, lanzamientos y joyas que cuentan historias.",
    "items": [
      {
        "platform": "Instagram",
        "handle": "@pilarica.joyas",
        "url": "https://www.instagram.com/pilarica.joyas"
      }
    ]
  }'::jsonb)
on conflict (section_key) do update set data = excluded.data, updated_at = now();

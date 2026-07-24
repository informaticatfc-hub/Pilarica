-- Pilarica · Páginas informativas (footer) — editable desde admin
-- Ejecutar después de site-content-sections.sql

insert into site_content (section_key, data) values
  ('info_pages', '{
    "sobre-pilarica": {
      "eyebrow": "Nuestra esencia",
      "titleHtml": "Sobre <em>Pilarica</em>",
      "lead": "Joyería de autor con alma, tradición y un compromiso honesto con quienes buscan piezas que perduran.",
      "bodyHtml": "<section class=\"info-block reveal\"><h2 class=\"info-heading\">Quiénes somos</h2><p class=\"info-text\">Pilarica nació con la convicción de que el lujo verdadero no debe ser un privilegio de pocos. Creamos joyas en oro 18k y piedras finas con diseño atemporal, certificado de autenticidad y una experiencia cercana para cada clienta.</p></section><section class=\"info-block reveal\"><h2 class=\"info-heading\">Nuestra promesa</h2><p class=\"info-text\">Materiales nobles, precios justos y piezas pensadas para acompañar los momentos que importan.</p></section>"
    },
    "cuidado-de-joyas": {
      "eyebrow": "Guía editorial",
      "titleHtml": "Cuidado de <em>joyas</em>",
      "lead": "Recomendaciones para conservar el brillo, la forma y la belleza de tus piezas Pilarica durante años.",
      "bodyHtml": "<section class=\"info-block reveal\"><p class=\"info-kicker\">Limpieza</p><h2 class=\"info-heading\">Cómo limpiar tus piezas</h2><ul class=\"info-list\"><li>Usa agua tibia con jabón neutro y un cepillo suave.</li><li>Seca con un paño de microfibra.</li><li>Evita productos abrasivos o cloro.</li></ul></section>"
    },
    "preguntas-frecuentes": {
      "eyebrow": "Ayuda",
      "titleHtml": "Preguntas <em>frecuentes</em>",
      "lead": "Respuestas a las dudas más comunes sobre compra, envío y cuidado de tus joyas.",
      "items": [
        {"q": "¿Cómo puedo comprar una pieza?", "a": "Explora el catálogo, agrega las piezas al carrito y solicita tu pedido por WhatsApp. Nuestro equipo te confirmará disponibilidad, talla y opciones de envío."},
        {"q": "¿Las joyas incluyen certificado?", "a": "Sí. Cada pieza Pilarica incluye certificado de autenticidad."},
        {"q": "¿Puedo conocer la pieza antes de comprar?", "a": "Contamos con showroom con cita previa en Cancún y Tuxtla Gutiérrez. Escríbenos para agendar una visita."}
      ]
    },
    "politica-de-garantia": {
      "eyebrow": "Compromiso Pilarica",
      "titleHtml": "Política de <em>garantía</em>",
      "lead": "Condiciones de garantía de nuestras piezas.",
      "bodyHtml": ""
    },
    "aviso-de-privacidad": {
      "eyebrow": "Legal",
      "titleHtml": "Aviso de <em>privacidad</em>",
      "lead": "Información sobre el tratamiento de datos personales.",
      "bodyHtml": ""
    },
    "terminos-y-condiciones": {
      "eyebrow": "Legal",
      "titleHtml": "Términos y <em>condiciones</em>",
      "lead": "Condiciones generales de uso del sitio y de compra.",
      "bodyHtml": ""
    }
  }'::jsonb)
on conflict (section_key) do nothing;

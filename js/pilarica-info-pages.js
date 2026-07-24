/**
 * Páginas informativas — defaults, merge con Supabase y render
 */
const PilaricaInfoPages = (() => {
  const SLUGS = [
    'sobre-pilarica',
    'cuidado-de-joyas',
    'politica-de-garantia',
    'preguntas-frecuentes',
    'aviso-de-privacidad',
    'terminos-y-condiciones',
  ];

  const TITLE_DOC = {
    'sobre-pilarica': 'Sobre Pilarica — Pilarica',
    'cuidado-de-joyas': 'Cuidado de joyas — Pilarica',
    'politica-de-garantia': 'Política de garantía — Pilarica',
    'preguntas-frecuentes': 'Preguntas frecuentes — Pilarica',
    'aviso-de-privacidad': 'Aviso de privacidad — Pilarica',
    'terminos-y-condiciones': 'Términos y condiciones — Pilarica',
  };

  const DEFAULTS = {
    'sobre-pilarica': {
      eyebrow: 'Nuestra esencia',
      titleHtml: 'Sobre <em>Pilarica</em>',
      lead: 'Joyería de autor con alma, tradición y un compromiso honesto con quienes buscan piezas que perduran.',
      bodyHtml: `
        <section class="info-block reveal">
          <h2 class="info-heading">Quiénes somos</h2>
          <p class="info-text">Pilarica nació con la convicción de que el lujo verdadero no debe ser un privilegio de pocos. Creamos joyas en oro 18k y piedras finas con diseño atemporal, certificado de autenticidad y una experiencia cercana para cada clienta.</p>
        </section>
        <section class="info-block reveal">
          <h2 class="info-heading">Nuestra promesa</h2>
          <p class="info-text">Materiales nobles, precios justos y piezas pensadas para acompañar los momentos que importan. Cada joya lleva consigo la calidez de la artesanía y la confianza de una marca mexicana.</p>
        </section>
        <section class="info-block reveal">
          <h2 class="info-heading">Conócenos más</h2>
          <p class="info-text">Visita nuestra página de historia, valores y contacto para conocer al equipo y las ubicaciones donde puedes encontrarnos.</p>
          <p class="info-text"><button type="button" class="btn btn-outline-gold btn-sm" data-nav="about">Ir a Conócenos</button></p>
        </section>`,
    },
    'cuidado-de-joyas': {
      eyebrow: 'Guía editorial',
      titleHtml: 'Cuidado de <em>joyas</em>',
      lead: 'Recomendaciones para conservar el brillo, la forma y la belleza de tus piezas Pilarica durante años.',
      bodyHtml: `
        <section class="info-block reveal">
          <p class="info-kicker">Introducción</p>
          <h2 class="info-heading">Trata tus joyas como tesoros</h2>
          <p class="info-text">El oro, los diamantes y las piedras naturales son duraderos, pero se benefician de un cuidado consciente. Estas pautas aplican a anillos, collares, aretes y pulseras de la casa.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Limpieza</p>
          <h2 class="info-heading">Cómo limpiar tus piezas</h2>
          <ul class="info-list">
            <li>Usa agua tibia con jabón neutro y un cepillo suave para piezas sin piedras porosas.</li>
            <li>Seca siempre con un paño de microfibra; evita papel que pueda rayar el metal.</li>
            <li>Para diamantes y oro liso, un baño breve en agua tibia suele ser suficiente.</li>
            <li>Evita productos abrasivos, cloro, alcohol o limpiadores caseros agresivos.</li>
          </ul>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Almacenamiento</p>
          <h2 class="info-heading">Cómo guardarlas</h2>
          <ul class="info-list">
            <li>Guarda cada pieza por separado para evitar rozaduras entre metales y piedras.</li>
            <li>Prefiere estuches forrados o bolsas individuales, lejos de la humedad directa.</li>
            <li>No dejes joyas expuestas al sol prolongado ni cerca de fuentes de calor.</li>
          </ul>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Uso diario</p>
          <h2 class="info-heading">Hábitos que prolongan su vida</h2>
          <ul class="info-list">
            <li>Quítate las joyas antes de nadar, hacer ejercicio o aplicar perfumes y cremas.</li>
            <li>Evita contacto con químicos de limpieza del hogar o piscinas cloradas.</li>
            <li>Revisa engastes y cierres periódicamente; ante cualquier movimiento, contáctanos.</li>
          </ul>
        </section>
        <section class="info-block info-block--note reveal">
          <p class="info-note">Si necesitas una revisión profesional de tu pieza, escríbenos por WhatsApp.</p>
        </section>`,
    },
    'preguntas-frecuentes': {
      eyebrow: 'Ayuda',
      titleHtml: 'Preguntas <em>frecuentes</em>',
      lead: 'Respuestas a las dudas más comunes sobre compra, envío y cuidado de tus joyas.',
      items: [
        {
          q: '¿Cómo puedo comprar una pieza?',
          a: 'Explora el catálogo, agrega las piezas al carrito y solicita tu pedido por WhatsApp. Nuestro equipo te confirmará disponibilidad, talla y opciones de envío.',
        },
        {
          q: '¿Las joyas incluyen certificado?',
          a: 'Sí. Cada pieza Pilarica incluye certificado de autenticidad que respalda materiales y autenticidad.',
        },
        {
          q: '¿Puedo conocer la pieza antes de comprar?',
          a: 'Contamos con showroom con cita previa en Cancún y Tuxtla Gutiérrez. Escríbenos para agendar una visita.',
        },
      ],
    },
    'politica-de-garantia': {
      eyebrow: 'Compromiso Pilarica',
      titleHtml: 'Política de <em>garantía</em>',
      lead: 'Condiciones de garantía de nuestras piezas.',
      bodyHtml: '',
    },
    'aviso-de-privacidad': {
      eyebrow: 'Legal',
      titleHtml: 'Aviso de <em>privacidad</em>',
      lead: 'Información sobre el tratamiento de datos personales.',
      bodyHtml: '',
    },
    'terminos-y-condiciones': {
      eyebrow: 'Legal',
      titleHtml: 'Términos y <em>condiciones</em>',
      lead: 'Condiciones generales de uso del sitio y de compra.',
      bodyHtml: '',
    },
  };

  function merge(remote) {
    const src = remote || {};
    const out = {};
    SLUGS.forEach(slug => {
      const base = DEFAULTS[slug] || {};
      const patch = src[slug] || {};
      out[slug] = {
        ...base,
        ...patch,
        items: Array.isArray(patch.items) ? patch.items : (base.items || []),
      };
    });
    return out;
  }

  function getMergedPages() {
    const remote = typeof PilaricaStore !== 'undefined'
      ? PilaricaStore.getSiteSection('info_pages')
      : null;
    return merge(remote);
  }

  function get(slug) {
    return getMergedPages()[slug] || null;
  }

  function isValidSlug(slug) {
    return SLUGS.includes(slug);
  }

  function isFaqPage(slug) {
    return slug === 'preguntas-frecuentes';
  }

  function renderFaq(items) {
    return `<div class="faq-list">${items.map((item, i) => `
      <div class="faq-item">
        <button type="button" class="faq-question" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">
          <span>${item.q}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}" hidden>
          <p>${item.a}</p>
        </div>
      </div>`).join('')}</div>`;
  }

  function _bindNavButtons(scope) {
    scope.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof AppController !== 'undefined') AppController.navigate(btn.dataset.nav);
      });
    });
  }

  function _bindBreadcrumb() {
    const breadcrumb = document.getElementById('info-breadcrumb');
    if (!breadcrumb) return;
    breadcrumb.querySelectorAll('[data-info-link]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        if (link.dataset.infoLink === 'home' && typeof AppController !== 'undefined') {
          AppController.navigate('home');
        }
      });
    });
  }

  function renderPage(slug) {
    const page = get(slug);
    if (!page) return false;

    const eyebrow = document.getElementById('info-eyebrow');
    const title = document.getElementById('info-title');
    const lead = document.getElementById('info-lead');
    const content = document.getElementById('info-content');
    const breadcrumb = document.getElementById('info-breadcrumb');

    if (eyebrow) eyebrow.textContent = page.eyebrow || '';
    if (title) title.innerHTML = page.titleHtml || '';
    if (lead) lead.textContent = page.lead || '';

    if (content) {
      if (isFaqPage(slug)) {
        const items = (page.items || []).filter(i => i.q && i.a);
        content.innerHTML = items.length
          ? renderFaq(items)
          : '<p class="info-empty">Las preguntas frecuentes se publicarán aquí pronto.</p>';
        if (items.length) bindFaq(content);
      } else if (page.bodyHtml && page.bodyHtml.trim()) {
        content.innerHTML = page.bodyHtml;
        _bindNavButtons(content);
      } else {
        content.innerHTML = '';
      }
    }

    if (breadcrumb) {
      const label = TITLE_DOC[slug]?.split(' — ')[0] || slug;
      breadcrumb.innerHTML = `
        <a href="/" data-info-link="home">Inicio</a>
        <span class="breadcrumb-sep" aria-hidden="true">/</span>
        <span class="breadcrumb-current">${label}</span>`;
      _bindBreadcrumb();
    }

    document.title = TITLE_DOC[slug] || 'Pilarica';
    return true;
  }

  function bindFaq(scope) {
    scope.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        const answer = document.getElementById(btn.getAttribute('aria-controls'));
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        btn.querySelector('.faq-icon').textContent = open ? '+' : '−';
        if (answer) answer.hidden = open;
      });
    });
  }

  return {
    SLUGS,
    DEFAULTS,
    TITLE_DOC,
    merge,
    getMergedPages,
    get,
    isValidSlug,
    isFaqPage,
    renderPage,
  };
})();

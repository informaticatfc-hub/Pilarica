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
      bodyHtml: `
        <section class="info-block reveal">
          <p class="info-text">Pilarica es responsable del tratamiento y protección de los datos personales que usted proporcione a través de nuestros medios de contacto.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Datos personales</p>
          <h2 class="info-heading">Qué información recopilamos</h2>
          <p class="info-text">Pilarica podrá recibir datos personales como su nombre, número telefónico, correo electrónico y cualquier información que usted proporcione voluntariamente al contactarnos para solicitar información, consultar disponibilidad de productos, solicitar una cotización o agendar una cita.</p>
          <p class="info-text">Actualmente, las consultas y solicitudes de cotización pueden realizarse principalmente a través de WhatsApp, teléfono o correo electrónico.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Finalidad</p>
          <h2 class="info-heading">Uso de la información</h2>
          <p class="info-text">Los datos proporcionados serán utilizados únicamente para:</p>
          <ul class="info-list">
            <li>Atender sus consultas y solicitudes.</li>
            <li>Proporcionar información y cotizaciones sobre nuestros productos.</li>
            <li>Dar seguimiento a su interés en alguna pieza.</li>
            <li>Coordinar citas y atención en nuestros puntos de venta.</li>
          </ul>
          <p class="info-text">Pilarica no utilizará sus datos para finalidades distintas a las aquí mencionadas sin informarle previamente cuando así lo requiera la legislación aplicable.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Seguridad</p>
          <h2 class="info-heading">Protección de sus datos</h2>
          <p class="info-text">Pilarica procurará mantener sus datos personales protegidos y utilizarlos únicamente para las finalidades señaladas en este Aviso de Privacidad.</p>
          <p class="info-text">Cuando usted se comunique con Pilarica mediante servicios externos como WhatsApp, el tratamiento de información realizado directamente por dichas plataformas también estará sujeto a sus propias políticas de privacidad.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Sus derechos</p>
          <h2 class="info-heading">Derechos sobre sus datos</h2>
          <p class="info-text">Usted podrá solicitar información sobre sus datos personales, así como su corrección, eliminación u oponerse a su uso cuando corresponda.</p>
          <p class="info-text">Para realizar cualquier solicitud relacionada con sus datos personales puede comunicarse con nosotros a través de:</p>
          <ul class="info-list">
            <li>Correo: <a href="mailto:mrk@pilaricajoyas.com.mx">mrk@pilaricajoyas.com.mx</a></li>
            <li>Teléfono: <a href="tel:+529611555744">+52 (961) 155 5744</a></li>
          </ul>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Actualizaciones</p>
          <h2 class="info-heading">Cambios al Aviso de Privacidad</h2>
          <p class="info-text">El presente Aviso de Privacidad podrá actualizarse cuando cambien los servicios o funcionalidades de Pilarica. Cualquier modificación estará disponible en este mismo sitio web.</p>
        </section>`,
    },
    'terminos-y-condiciones': {
      eyebrow: 'Legal',
      titleHtml: 'Términos y <em>condiciones</em>',
      lead: 'Condiciones generales de uso del sitio y de compra.',
      bodyHtml: `
        <section class="info-block reveal">
          <p class="info-text">Bienvenido al sitio web de Pilarica. Al navegar y utilizar este sitio, usted acepta los presentes Términos y Condiciones.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Navegación</p>
          <h2 class="info-heading">Uso del sitio</h2>
          <p class="info-text">Este sitio web tiene como finalidad presentar el catálogo de productos de Pilarica, proporcionar información sobre la marca y facilitar el contacto con nuestros clientes.</p>
          <p class="info-text">Los productos mostrados en el sitio están sujetos a disponibilidad. La publicación de una pieza en el catálogo no garantiza que se encuentre disponible al momento de realizar una consulta.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Catálogo</p>
          <h2 class="info-heading">Productos, precios y cotizaciones</h2>
          <p class="info-text">Las imágenes de los productos tienen fines ilustrativos y buscan representar las piezas de la manera más fiel posible. Sin embargo, pueden existir ligeras variaciones en el color o apariencia dependiendo de la pantalla utilizada.</p>
          <p class="info-text">Los precios, características y disponibilidad de los productos pueden cambiar sin previo aviso.</p>
          <p class="info-text">Las solicitudes de información y cotizaciones realizadas mediante WhatsApp, teléfono o correo electrónico no representan por sí mismas una compra confirmada. La disponibilidad, precio final y condiciones de compra serán confirmados directamente por Pilarica antes de concretar cualquier operación.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Atención</p>
          <h2 class="info-heading">Compras y atención</h2>
          <p class="info-text">Actualmente, este sitio web funciona como un catálogo informativo y medio de contacto. Las compras no se procesan directamente a través del sitio web.</p>
          <p class="info-text">Para consultar disponibilidad, solicitar una cotización o recibir atención personalizada, puede comunicarse con Pilarica mediante los canales de contacto disponibles en este sitio.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Compromiso</p>
          <h2 class="info-heading">Garantía</h2>
          <p class="info-text">Las condiciones aplicables a garantías dependerán del producto adquirido y de las circunstancias de cada caso. Para conocer las condiciones vigentes, consulte nuestra <a href="/politica-de-garantia" data-info-link="politica-de-garantia">Política de Garantía</a> o comuníquese directamente con Pilarica.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Contenido</p>
          <h2 class="info-heading">Propiedad intelectual</h2>
          <p class="info-text">El contenido de este sitio web, incluyendo fotografías, imágenes, logotipos, textos, diseño y demás elementos visuales relacionados con Pilarica, se encuentra protegido por la legislación aplicable y no podrá ser utilizado, reproducido o distribuido sin la autorización correspondiente de sus respectivos titulares.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Terceros</p>
          <h2 class="info-heading">Enlaces externos</h2>
          <p class="info-text">El sitio puede contener enlaces a servicios externos, como WhatsApp u otras plataformas. Pilarica no es responsable del funcionamiento, disponibilidad o políticas de privacidad de dichos servicios.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Vigencia</p>
          <h2 class="info-heading">Modificaciones</h2>
          <p class="info-text">Pilarica podrá modificar el contenido del sitio, sus productos, precios y los presentes Términos y Condiciones cuando resulte necesario.</p>
          <p class="info-text">La versión vigente estará disponible en esta misma sección.</p>
        </section>
        <section class="info-block reveal">
          <p class="info-kicker">Contacto</p>
          <h2 class="info-heading">¿Dudas?</h2>
          <p class="info-text">Para cualquier duda relacionada con nuestros productos o estos Términos y Condiciones, puede comunicarse con nosotros:</p>
          <ul class="info-list">
            <li>Correo: <a href="mailto:mrk@pilaricajoyas.com.mx">mrk@pilaricajoyas.com.mx</a></li>
            <li>Teléfono: <a href="tel:+529611555744">+52 (961) 155 5744</a></li>
          </ul>
        </section>`,
    },
  };

  /** Páginas legales fijas en código — no se sobrescriben desde Supabase ni admin */
  const STATIC_SLUGS = ['aviso-de-privacidad', 'terminos-y-condiciones'];

  function merge(remote) {
    const src = remote || {};
    const out = {};
    SLUGS.forEach(slug => {
      const base = DEFAULTS[slug] || {};
      if (STATIC_SLUGS.includes(slug)) {
        out[slug] = { ...base, items: base.items || [] };
        return;
      }
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
      ? (PilaricaStore.getRawSiteSection
        ? PilaricaStore.getRawSiteSection('info_pages')
        : PilaricaStore.getSiteSection('info_pages'))
      : null;
    const merged = merge(remote);
    return merged;
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

  function _bindInfoLinks(scope) {
    scope.querySelectorAll('[data-info-link]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        if (typeof AppController !== 'undefined') {
          AppController.navigate('info', { infoSlug: link.dataset.infoLink });
        }
      });
    });
  }

  function formatBodyHtml(html) {
    if (!html || !html.trim()) return '';
    if (/<[a-z][\s\S]*>/i.test(html)) return html;
    return html
      .split(/\n{2,}/)
      .map(block => block.trim())
      .filter(Boolean)
      .map(block => `<p>${block.replace(/\n/g, '<br/>')}</p>`)
      .join('');
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
        content.innerHTML = formatBodyHtml(page.bodyHtml);
        _bindNavButtons(content);
        _bindInfoLinks(content);
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
    STATIC_SLUGS,
    TITLE_DOC,
    merge,
    getMergedPages,
    get,
    isValidSlug,
    isFaqPage,
    renderPage,
  };
})();

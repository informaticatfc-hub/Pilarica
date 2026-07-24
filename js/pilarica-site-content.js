/**
 * Contenido editable del sitio — defaults y aplicación al DOM
 */
const PilaricaSiteContent = (() => {
  const DEFAULTS = {
    hero: {
      eyebrow: 'Nueva Colección 2025',
      titleHtml: 'El lujo<br/>que <em>mereces</em><br/>sentir.',
      body: 'Piezas únicas elaboradas con los más finos materiales. Diseños que perduran, precios que sorprenden. Cada joya, un certificado de autenticidad.',
      imageUrl: 'assets/products/pulseras/pulsera-oro-turquesa-piscina.png',
      stats: [
        { num: '18k', label: 'Oro certificado' },
        { num: '100%', label: 'Autenticidad' },
        { num: '+200', label: 'Diseños únicos' },
        { num: '5*', label: 'Garantía total' },
      ],
    },
    quote: {
      textHtml: '"En Pilarica creemos que el lujo no debe ser un privilegio de pocos. Cada pieza es <strong>artesanía honesta</strong>, materiales excepcionales y un precio que celebra, no excluye."',
      cite: '- Pilarica, Joyería de Autor',
    },
    featured: {
      eyebrow: 'Piezas destacadas',
      titleHtml: 'Nuestra <em>selección</em>',
      body: 'Cada pieza ha sido seleccionada por su diseño excepcional y la calidad de sus materiales. Porque mereces lo mejor.',
    },
    brand: {
      eyebrow: 'Nuestra promesa',
      titleHtml: 'Joyería con <em>alma</em><br/>y propósito',
      body: 'Inspiradas en la devoción y permanencia de la Virgen del Pilar, cada pieza nace con la intención de acompañarte en los momentos que importan. Tradición, calidad y una presencia que se siente desde el primer instante.',
    },
    catalog_hero: {
      eyebrow: 'Colección Pilarica 2025',
      titleHtml: 'Nuestras <em>piezas</em>',
      body: 'Joyas que cuentan historias. Cada una, única. Cada una, certificada.',
    },
    category_covers: {
      anillos: 'assets/products/bento/bento-anillos.png',
      collares: 'assets/products/bento/bento-collares.png',
      aretes: 'assets/products/bento/bento-aretes.png',
      pulseras: 'assets/products/bento/bento-pulseras.png',
    },
    about_hero: {
      eyebrow: 'Nuestra historia',
      titleHtml: 'Más que joyas,<br/><em>momentos</em>',
      story: 'Pilarica nació de una convicción simple: el lujo verdadero no debería ser un privilegio de pocos. Inspiradas en la permanencia y devoción de la Virgen del Pilar, creamos piezas que acompañan los momentos que importan.',
      imageUrl: 'assets/products/anillos/coleccion-esmeralda-lifestyle.png',
    },
    about_mission: {
      titleHtml: 'Nuestra<br/><em>misión</em>',
      body: 'Democratizar el acceso a la joyería de alta calidad, sin sacrificar ni el diseño ni los materiales. Cada pieza lleva consigo la promesa de autenticidad y el compromiso de un precio justo.',
    },
    values: {
      titleHtml: 'Los pilares de <em>Pilarica</em>',
      items: [
        { icon: 'star', title: 'Autenticidad', desc: 'Cada pieza incluye su certificado personal. Materiales nobles, sin compromisos.' },
        { icon: 'shield', title: 'Garantía real', desc: 'Respaldamos cada joya. Si algo no está perfecto, lo resolvemos sin preguntas.' },
        { icon: 'heart', title: 'Diseño con alma', desc: 'Clásicos que perduran y modernos que sorprenden. Nunca genéricos.' },
        { icon: 'tag', title: 'Precio justo', desc: 'Sin intermediarios, sin márgenes inflados. Lujo democrático, siempre.' },
      ],
    },
    team: {
      eyebrow: 'Quiénes somos',
      titleHtml: 'El corazón<br/>de <em>Pilarica</em>',
      members: [
        {
          name: 'Pilar Rodríguez',
          role: 'Fundadora & Directora Creativa',
          bio: 'Con más de 15 años en la industria joyera, Pilar fundó la marca con la visión de acercar la alta joyería a quienes la aprecian de verdad.',
          initials: 'PR',
        },
      ],
    },
    locations: {
      eyebrow: 'Encuéntranos',
      titleHtml: 'Visítanos o<br/><em>escríbenos</em>',
      items: [
        {
          id: 'loc-01',
          name: 'Pilarica - Boutique Principal',
          address: 'Showroom en Cancún y Tuxtla Gutiérrez con cita',
          city: '',
          cp: '',
          phone: '+52 (961) 155 5744',
          whatsapp: '529611555744',
          email: 'mrk@pilaricajoyas.com.mx',
          hours: [
            { days: 'Lunes - Viernes', time: '10:00 - 20:00' },
            { days: 'Sábado', time: '10:00 - 18:00' },
            { days: 'Domingo', time: 'Con cita previa' },
          ],
          mapUrl: 'https://maps.google.com/?q=Cancun+Zona+Hotelera',
        },
      ],
    },
    social: {
      eyebrow: 'Comunidad',
      titleHtml: 'Únete a nuestra<br/><em>comunidad</em>',
      body: 'Inspiración, lanzamientos y joyas que cuentan historias.',
      items: [
        { platform: 'Instagram', handle: '@pilarica.joyas', url: 'https://www.instagram.com/pilarica.joyas' },
      ],
    },
  };

  function _setHtml(id, html) {
    const el = document.getElementById(id);
    if (el && html != null) el.innerHTML = html;
  }

  function _setText(id, text) {
    const el = document.getElementById(id);
    if (el && text != null) el.textContent = text;
  }

  function _setImage(id, url, alt) {
    const el = document.getElementById(id);
    if (!el || !url) return;
    const src = typeof PilaricaStore !== 'undefined' && PilaricaStore.resolvePublicUrl
      ? PilaricaStore.resolvePublicUrl(url)
      : url;
    el.src = src;
    if (alt) el.alt = alt;
  }

  function merge(sections) {
    const out = {};
    Object.keys(DEFAULTS).forEach(key => {
      out[key] = { ...DEFAULTS[key], ...(sections[key] || {}) };
    });
    return out;
  }

  function apply(sections) {
    const c = merge(sections || {});

    _setText('content-hero-eyebrow', c.hero.eyebrow);
    _setHtml('content-hero-title', c.hero.titleHtml);
    _setText('content-hero-body', c.hero.body);
    _setImage('content-hero-image', c.hero.imageUrl, 'Colección Pilarica');

    const statsEl = document.getElementById('content-hero-stats');
    if (statsEl && Array.isArray(c.hero.stats)) {
      statsEl.innerHTML = c.hero.stats.map(s => `
        <div class="stat-item">
          <span class="stat-num">${s.num}</span>
          <span class="stat-label">${s.label}</span>
        </div>`).join('');
    }

    _setHtml('content-quote-text', c.quote.textHtml);
    _setText('content-quote-cite', c.quote.cite);

    _setText('content-featured-eyebrow', c.featured.eyebrow);
    _setHtml('content-featured-title', c.featured.titleHtml);
    _setText('content-featured-body', c.featured.body);

    _setText('content-brand-eyebrow', c.brand.eyebrow);
    _setHtml('content-brand-title', c.brand.titleHtml);
    _setText('content-brand-body', c.brand.body);

    _setText('content-catalog-eyebrow', c.catalog_hero.eyebrow);
    _setHtml('content-catalog-title', c.catalog_hero.titleHtml);
    _setText('content-catalog-body', c.catalog_hero.body);

    _setText('content-about-eyebrow', c.about_hero.eyebrow);
    _setHtml('content-about-title', c.about_hero.titleHtml);
    _setText('content-about-story', c.about_hero.story);
    _setImage('content-about-image', c.about_hero.imageUrl, 'Historia Pilarica');

    _setHtml('content-mission-title', c.about_mission.titleHtml);
    _setText('content-mission-body', c.about_mission.body);

    _setHtml('values-title', c.values.titleHtml);
    _setText('content-team-eyebrow', c.team.eyebrow);
    _setHtml('content-team-title', c.team.titleHtml);
    _setText('content-contact-eyebrow', c.locations.eyebrow);
    _setHtml('contact-title', c.locations.titleHtml);
    _setText('content-social-eyebrow', c.social.eyebrow);
    _setHtml('social-title', c.social.titleHtml);
    _setText('content-social-body', c.social.body);

    renderTeamMembers(c.team.members);

    return c;
  }

  function renderTeamMembers(members) {
    const root = document.getElementById('content-team-members');
    if (!root || !Array.isArray(members) || !members.length) return;
    root.innerHTML = members.map(m => `
      <div style="display:flex; gap: 24px; align-items: flex-start; max-width: 500px;">
        <div style="width:72px; height:72px; background:var(--gold-pale); border: 1px solid var(--border-md); flex-shrink:0; display:flex; align-items:center; justify-content:center;">
          <span style="font-family:var(--serif); font-size:22px; font-weight:300; color:var(--gold);">${m.initials || 'PR'}</span>
        </div>
        <div>
          <p style="font-family:var(--serif); font-size:22px; font-weight:300; color:var(--ink);">${m.name || ''}</p>
          <p style="font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); margin: 6px 0 12px;">${m.role || ''}</p>
          <p style="font-size:14px; font-weight:300; color:var(--stone); line-height:1.8;">${m.bio || ''}</p>
        </div>
      </div>`).join('');
  }

  return { DEFAULTS, merge, apply, renderTeamMembers };
})();

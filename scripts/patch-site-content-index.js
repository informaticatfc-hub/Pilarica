const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let s = fs.readFileSync(indexPath, 'utf8');

if (!s.includes('pilarica-site-content.js')) {
  s = s.replace(
    '<script src="js/pilarica-store.js"></script>',
    '<script src="js/pilarica-store.js"></script>\n<script src="js/pilarica-site-content.js"></script>'
  );
}

// Hero image: replace base64 img with editable placeholder
s = s.replace(
  /<div class="hero-right">\s*<img src="data:image[^"]+" alt="[^"]*" \/>/,
  `<div class="hero-right">
      <img id="content-hero-image" src="assets/products/pulseras/pulsera-oro-turquesa-piscina.png" alt="Colección Pilarica" />`
);

s = s.replace(
  `<p class="section-eyebrow anim-up d1">Nueva Colección 2025</p>
      <h1 class="hero-title anim-up d2">
        El lujo<br/>que <em>mereces</em><br/>sentir.
      </h1>
      <p class="hero-body anim-up d3">
        Piezas únicas elaboradas con los más finos materiales. Diseños que perduran, 
        precios que sorprenden. Cada joya, un certificado de autenticidad.
      </p>`,
  `<p class="section-eyebrow anim-up d1" id="content-hero-eyebrow">Nueva Colección 2025</p>
      <h1 class="hero-title anim-up d2" id="content-hero-title">
        El lujo<br/>que <em>mereces</em><br/>sentir.
      </h1>
      <p class="hero-body anim-up d3" id="content-hero-body">
        Piezas únicas elaboradas con los más finos materiales. Diseños que perduran, 
        precios que sorprenden. Cada joya, un certificado de autenticidad.
      </p>`
);

s = s.replace(
  `<div class="hero-stats">
        <div class="stat-item">
          <span class="stat-num">18k</span>
          <span class="stat-label">Oro certificado</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">100%</span>
          <span class="stat-label">Autenticidad</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">+200</span>
          <span class="stat-label">Diseños únicos</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">5*</span>
          <span class="stat-label">Garantía total</span>
        </div>
      </div>`,
  `<div class="hero-stats" id="content-hero-stats">
        <div class="stat-item">
          <span class="stat-num">18k</span>
          <span class="stat-label">Oro certificado</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">100%</span>
          <span class="stat-label">Autenticidad</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">+200</span>
          <span class="stat-label">Diseños únicos</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">5*</span>
          <span class="stat-label">Garantía total</span>
        </div>
      </div>`
);

s = s.replace(
  `<blockquote>
      "En Pilarica creemos que el lujo no debe ser un privilegio de pocos. 
      Cada pieza es <strong>artesanía honesta</strong>, materiales excepcionales 
      y un precio que celebra, no excluye."
    </blockquote>
    <cite>- Pilarica, Joyeria de Autor</cite>`,
  `<blockquote id="content-quote-text">
      "En Pilarica creemos que el lujo no debe ser un privilegio de pocos. 
      Cada pieza es <strong>artesanía honesta</strong>, materiales excepcionales 
      y un precio que celebra, no excluye."
    </blockquote>
    <cite id="content-quote-cite">- Pilarica, Joyería de Autor</cite>`
);

s = s.replace(
  `<p class="section-eyebrow">Piezas destacadas</p>
        <h2 class="section-title" id="featured-title">Nuestra <em>selección</em></h2>
        <p class="section-body">Cada pieza ha sido seleccionada por su diseño excepcional y la calidad de sus materiales. Porque mereces lo mejor.</p>`,
  `<p class="section-eyebrow" id="content-featured-eyebrow">Piezas destacadas</p>
        <h2 class="section-title" id="content-featured-title">Nuestra <em>selección</em></h2>
        <p class="section-body" id="content-featured-body">Cada pieza ha sido seleccionada por su diseño excepcional y la calidad de sus materiales. Porque mereces lo mejor.</p>`
);

s = s.replace(
  `<p class="section-eyebrow">Nuestra promesa</p>
      <h2 class="section-title" id="brand-title">Joyería con <em>alma</em><br/>y propósito</h2>
      <p class="section-body" style="color:rgba(253,250,245,0.65); margin-top:20px;">
        Inspiradas en la devoción y permanencia de la Virgen del Pilar, cada pieza 
        nace con la intención de acompañarte en los momentos que importan. Tradición, 
        calidad y una presencia que se siente desde el primer instante.
      </p>`,
  `<p class="section-eyebrow" id="content-brand-eyebrow">Nuestra promesa</p>
      <h2 class="section-title" id="content-brand-title">Joyería con <em>alma</em><br/>y propósito</h2>
      <p class="section-body" id="content-brand-body" style="color:rgba(253,250,245,0.65); margin-top:20px;">
        Inspiradas en la devoción y permanencia de la Virgen del Pilar, cada pieza 
        nace con la intención de acompañarte en los momentos que importan. Tradición, 
        calidad y una presencia que se siente desde el primer instante.
      </p>`
);

s = s.replace(
  `<p class="section-eyebrow">Colección Pilarica 2025</p>
        <h1 class="section-title">Nuestras <em>piezas</em></h1>
        <p class="section-body">Joyas que cuentan historias. Cada una, única. Cada una, certificada.</p>`,
  `<p class="section-eyebrow" id="content-catalog-eyebrow">Colección Pilarica 2025</p>
        <h1 class="section-title" id="content-catalog-title">Nuestras <em>piezas</em></h1>
        <p class="section-body" id="content-catalog-body">Joyas que cuentan historias. Cada una, única. Cada una, certificada.</p>`
);

// About hero image base64 -> editable
s = s.replace(
  /<div class="about-hero-img">\s*<img src="data:image[^"]+" alt="[^"]*" \/>/,
  `<div class="about-hero-img">
      <img id="content-about-image" src="assets/products/anillos/coleccion-esmeralda-lifestyle.png" alt="Historia Pilarica" />`
);

s = s.replace(
  `<p class="section-eyebrow">Nuestra historia</p>
      <h1 class="section-title">Más que joyas,<br/><em>momentos</em></h1>
      <p class="about-story-text" id="about-story">Cargando...</p>`,
  `<p class="section-eyebrow" id="content-about-eyebrow">Nuestra historia</p>
      <h1 class="section-title" id="content-about-title">Más que joyas,<br/><em>momentos</em></h1>
      <p class="about-story-text" id="content-about-story">Cargando...</p>`
);

s = s.replace(
  `<h3 class="section-title" style="color:var(--cream); font-size: clamp(22px,3vw,32px);">Nuestra<br/><em>misión</em></h3>
    <p id="about-mission">Cargando...</p>`,
  `<h3 class="section-title" id="content-mission-title" style="color:var(--cream); font-size: clamp(22px,3vw,32px);">Nuestra<br/><em>misión</em></h3>
    <p id="content-mission-body">Cargando...</p>`
);

s = s.replace(
  `  function buildWhatsAppUrl() {
    const items = CartModel.getItems();
    const lines = items.map(item => {
      const p = ProductModel.getById(item.productId);
      if (!p) return null;
      return \`• \${p.name} (\${p.id}) x\${item.qty} — \${ProductModel.formatPrice({ price: p.price * item.qty })}\`;
    }).filter(Boolean);
    const total = ProductModel.formatPrice({ price: CartModel.getTotal() });
    const text = encodeURIComponent(
      \`Hola Pilarica, me interesa solicitar el siguiente pedido:\\n\\n\${lines.join('\\n')}\\n\\nSubtotal: \${total} MXN\\n\\n¿Me pueden ayudar con disponibilidad y envío?\`
    );
    return \`https://wa.me/529611555744?text=\${text}\`;
  }`,
  `  function buildWhatsAppUrl() {
    const items = CartModel.getItems();
    const lines = items.map(item => {
      const p = ProductModel.getById(item.productId);
      if (!p) return null;
      const link = PilaricaStore.getProductUrl(p.id);
      const lineTotal = ProductModel.formatPrice({ price: p.price * item.qty });
      return [
        \`• \${p.name}\`,
        \`  SKU: \${p.id}\`,
        \`  Ver pieza: \${link}\`,
        \`  Cantidad: \${item.qty} — \${lineTotal}\`,
      ].join('\\n');
    }).filter(Boolean);
    const total = ProductModel.formatPrice({ price: CartModel.getTotal() });
    const text = encodeURIComponent(
      \`Hola Pilarica, me interesa solicitar el siguiente pedido:\\n\\n\${lines.join('\\n\\n')}\\n\\nSubtotal: \${total} MXN\\n\\n¿Me pueden ayudar con disponibilidad y envío?\`
    );
    return \`https://wa.me/529611555744?text=\${text}\`;
  }`
);

s = s.replace(
  `  function _renderAbout() {
    const brand = StoreModel.getBrand();
    const locs = StoreModel.getLocations();
    const social = StoreModel.getSocial();

    const storyEl = document.getElementById('about-story');
    if (storyEl) storyEl.textContent = brand.story;

    const missionEl = document.getElementById('about-mission');
    if (missionEl) missionEl.textContent = brand.mission;
`,
  `  function _renderAbout() {
    const brand = StoreModel.getBrand();
    const locs = StoreModel.getLocations();
    const social = StoreModel.getSocial();
    if (typeof PilaricaSiteContent !== 'undefined') {
      PilaricaSiteContent.apply(PilaricaStore.getSiteContent());
    }
`
);

s = s.replace(
  `    ProductModel.init().then(() => {
      const grid = document.getElementById('home-values-grid');
      if (grid) {
        grid.innerHTML = StoreModel.getBrand().values.map(v => ComponentView.valueCard(v)).join('');
      }
      AppController.init();
    });`,
  `    ProductModel.init().then(() => {
      if (typeof PilaricaSiteContent !== 'undefined') {
        PilaricaSiteContent.apply(PilaricaStore.getSiteContent());
      }
      const grid = document.getElementById('home-values-grid');
      if (grid) {
        grid.innerHTML = StoreModel.getBrand().values.map(v => ComponentView.valueCard(v)).join('');
      }
      AppController.init();
    });`
);

fs.writeFileSync(indexPath, s);
console.log('index.html patched for site content');

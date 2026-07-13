const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let s = fs.readFileSync(indexPath, 'utf8');

if (!s.includes('pilarica-store.js')) {
  s = s.replace(
    '</script>\n<script>\n\nconst ProductModel',
    '</script>\n<script src="js/pilarica-config.js"></script>\n<script src="js/pilarica-store.js"></script>\n<script>\n\nconst ProductModel'
  );
}

const newModel = `const ProductModel = (() => {
  let _products = [];

  function _sync() {
    _products = typeof PilaricaStore !== 'undefined' ? PilaricaStore.getProducts() : [];
  }

  async function init() {
    if (typeof PilaricaStore !== 'undefined') await PilaricaStore.init();
    _sync();
  }

  function reload() {
    if (typeof PilaricaStore !== 'undefined') PilaricaStore.reload();
    _sync();
  }

  return {
    init,
    reload,
    getAll() { return [..._products]; },
    getFeatured() { return _products.filter(p => p.featured); },
    getByCategory(cat) {
      if (cat === 'all') return [..._products];
      return _products.filter(p => p.category === cat);
    },
    getById(id) { return _products.find(p => p.id === id) || null; },
    getCategories() { return PilaricaStore.CATEGORIES; },
    getCategoryLabel(cat) { return PilaricaStore.CATEGORY_LABELS[cat] || cat; },
    getCategoryCoverUrl(cat) { return PilaricaStore.getCategoryCover(cat); },
    getCategoryDescription(cat) { return PilaricaStore.CATEGORY_DESCRIPTIONS[cat] || ''; },
    countByCategory(cat) { return _products.filter(p => p.category === cat).length; },
    formatPrice(product) { return PilaricaStore.formatPrice(product.price, product.currency); },
    getProductImage(p) { return PilaricaStore.getProductImage(p); },
  };
})();`;

const start = s.indexOf('const ProductModel = (() => {');
const end = s.indexOf('const CartModel = (() => {');
if (start === -1 || end === -1) throw new Error('ProductModel/CartModel markers not found');
s = s.slice(0, start) + newModel + '\n\n</script>\n<script>\n\n' + s.slice(end);

s = s.replace(
  `function _productThumb(p, className = 'product-img') {
    if (typeof PILARICA_IMAGES !== 'undefined' && PILARICA_IMAGES[p.imageKey]) {
      return \`<img src="\${PILARICA_IMAGES[p.imageKey]}" alt="\${p.name}" class="\${className}" loading="lazy" />\`;
    }`,
  `function _productThumb(p, className = 'product-img') {
    const src = ProductModel.getProductImage(p);
    if (src) {
      return \`<img src="\${src}" alt="\${p.name}" class="\${className}" loading="lazy" />\`;
    }`
);

s = s.replace(
  `const imgSrc = (typeof PILARICA_IMAGES !== 'undefined' && PILARICA_IMAGES[p.imageKey])
      ? PILARICA_IMAGES[p.imageKey]
      : '';`,
  'const imgSrc = ProductModel.getProductImage(p);'
);

s = s.replace(
  `  function productCard(p, showCertBtn = false) {
    const img = (typeof PILARICA_IMAGES !== 'undefined' && PILARICA_IMAGES[p.imageKey])
      ? \`<img src="\${PILARICA_IMAGES[p.imageKey]}" alt="\${p.name}" class="product-img" loading="lazy" />\`
      : \`<div class="product-img-placeholder">\${_jewelSVG(p.category)}</div>\`;`,
  `  function productCard(p, showCertBtn = false) {
    const src = ProductModel.getProductImage(p);
    const img = src
      ? \`<img src="\${src}" alt="\${p.name}" class="product-img" loading="lazy" />\`
      : \`<div class="product-img-placeholder">\${_jewelSVG(p.category)}</div>\`;`
);

s = s.replace(
  `    const coverKey = ProductModel.getCategoryCoverKey(cat);
    const bg = (typeof PILARICA_IMAGES !== 'undefined' && PILARICA_IMAGES[coverKey])
      ? \`style="background-image:url('\${PILARICA_IMAGES[coverKey]}')"\`
      : '';`,
  `    const coverUrl = ProductModel.getCategoryCoverUrl(cat);
    const bg = coverUrl ? \`style="background-image:url('\${coverUrl}')"\` : '';`
);

s = s.replace(
  `  function navigate(page, opts = {}) {
    if (!PAGES.includes(page)) return;

    if (page === 'product') {`,
  `  function navigate(page, opts = {}) {
    if (!PAGES.includes(page)) return;
    ProductModel.reload();

    if (page === 'product') {`
);

s = s.replace(
  `  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('home-values-grid');
    if (grid) {
      grid.innerHTML = StoreModel.getBrand().values.map(v => ComponentView.valueCard(v)).join('');
    }
    AppController.init();
  });`,
  `  document.addEventListener('DOMContentLoaded', () => {
    ProductModel.init().then(() => {
      const grid = document.getElementById('home-values-grid');
      if (grid) {
        grid.innerHTML = StoreModel.getBrand().values.map(v => ComponentView.valueCard(v)).join('');
      }
      AppController.init();
    });
  });`
);

fs.writeFileSync(indexPath, s);
console.log('index.html patched OK');

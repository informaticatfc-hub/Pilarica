/**
 * Capa de datos compartida — tienda (index.html) + admin (admin.html)
 * local: localStorage · supabase: lectura pública + escritura admin autenticado
 */
const PilaricaStore = (() => {
  const AUTH_TOKEN_KEY = 'pilarica_supabase_token';
  const AUTH_EMAIL_KEY = 'pilarica_supabase_email';

  const CATEGORIES = ['anillos', 'collares', 'aretes', 'pulseras'];
  const CATEGORY_LABELS = {
    anillos: 'Anillos',
    collares: 'Collares',
    aretes: 'Aretes',
    pulseras: 'Pulseras',
  };
  const CATEGORY_DESCRIPTIONS = {
    anillos: 'Anillos de autor en oro 18k con diamantes y piedras preciosas. Piezas únicas para momentos que perduran.',
    collares: 'Collares exclusivos que combinan diseño contemporáneo con la elegancia de la alta joyería.',
    aretes: 'Aretes delicados y expresivos, elaborados con los más finos materiales y acabados impecables.',
    pulseras: 'Pulseras esculturales en oro 18k. Joyas que abrazan la muñeca con sofisticación y carácter.',
  };
  const BENTO_COVERS = {
    anillos: 'assets/products/bento/bento-anillos.png',
    collares: 'assets/products/bento/bento-collares.png',
    aretes: 'assets/products/bento/bento-aretes.png',
    pulseras: 'assets/products/bento/bento-pulseras.png',
  };

  const SEED_PRODUCTS = [
    { id: 'PIL-001', name: 'Collar Candy Baguette', category: 'collares', material: 'Oro 18k', stone: 'Diamantes Baguette', size: '42 cm', currency: 'MXN', price: 48500, imageKey: 'img1', image: '', description: 'Cadena paperclip en oro 18k con colgante rectangular de esmalte rosa y diamantes baguette. Una fusión entre lo lúdico y lo sofisticado.', featured: true, inStock: true, active: true },
    { id: 'PIL-002', name: 'Pulsera Marquise Star', category: 'pulseras', material: 'Oro 18k', stone: 'Diamantes Marquise & Baguette', size: '17 cm', currency: 'MXN', price: 62000, imageKey: 'img2', image: '', description: 'Pulsera rígida de bolas texturizadas en oro 18k con tres medallones de diamantes marquise y baguette. Elegancia escultural.', featured: true, inStock: true, active: true },
    { id: 'PIL-003', name: 'Collar Doble Corazón', category: 'collares', material: 'Oro Blanco 18k', stone: 'Pavé de Diamantes', size: '45 cm', currency: 'MXN', price: 55000, imageKey: 'img3', image: '', description: 'Dos corazones en pavé total de diamantes sobre cadena delicada de oro blanco. Romántico, atrevido y eterno.', featured: true, inStock: true, active: true },
    { id: 'PIL-004', name: 'Anillo Pear Bicolor', category: 'anillos', material: 'Oro 18k', stone: 'Diamantes Amarillos & Blancos', size: 'Talla 14', currency: 'MXN', price: 38000, imageKey: 'img4', image: '', description: 'Anillo abierto con alternancia de diamantes pera amarillos y blancos, montados en garras individuales.', featured: true, inStock: true, active: true },
    { id: 'PIL-005', name: 'Aretes Corazón Zafiro', category: 'aretes', material: 'Oro Rose 18k', stone: 'Zafiro Azul & Diamantes', size: '1.8 cm', currency: 'MXN', price: 42000, imageKey: 'img5', image: '', description: 'Aretes en forma de corazón con zafiro azul central rodeado de doble halo de diamantes.', featured: true, inStock: true, active: true },
    { id: 'PIL-006', name: 'Collar Tennis Diamantes', category: 'collares', material: 'Oro Blanco 18k', stone: 'Diamantes', size: '40 cm', currency: 'MXN', price: 72000, image: 'assets/products/collares/collar-tennis-diamantes.png', imageKey: '', description: 'Elegante collar tennis con diamantes engarzados en oro blanco.', featured: false, inStock: true, active: true },
    { id: 'PIL-007', name: 'Collar Cruz Zafiro', category: 'collares', material: 'Oro Amarillo 18k', stone: 'Zafiro & Diamantes', size: '45 cm', currency: 'MXN', price: 58000, image: 'assets/products/collares/collar-cruz-zafiro-oro.png', imageKey: '', description: 'Dije en forma de cruz con zafiros rectangulares rodeados de brillantes.', featured: false, inStock: true, active: true },
    { id: 'PIL-008', name: 'Stack Anillos Oro & Diamante', category: 'anillos', material: 'Oro 18k', stone: 'Diamantes', size: 'Talla 12–14', currency: 'MXN', price: 45000, image: 'assets/products/anillos/anillos-stack-oro-diamantes.png', imageKey: '', description: 'Combinación de anillos en oro amarillo y blanco con pavé de diamantes.', featured: false, inStock: true, active: true },
  ];

  let _products = [];
  let _ready = false;

  function _cfg() {
    return PilaricaConfig.supabase || {};
  }

  function _normalize(product) {
    const p = { ...product };
    p.price = Number(p.price) || 0;
    p.featured = !!p.featured;
    p.inStock = p.inStock !== false;
    p.active = p.active !== false;
    p.currency = p.currency || 'MXN';
    p.image = p.image || '';
    p.imageKey = p.imageKey || '';
    return p;
  }

  function _rowToProduct(row) {
    return _normalize({
      id: row.sku,
      name: row.name,
      category: row.category,
      material: row.material,
      stone: row.stone,
      size: row.size,
      currency: row.currency,
      price: row.price,
      image: row.image_url,
      imageKey: '',
      description: row.description,
      featured: row.featured,
      inStock: row.in_stock,
      active: row.active,
    });
  }

  function _productToRow(product) {
    const p = _normalize(product);
    return {
      sku: p.id,
      name: p.name,
      category: p.category,
      description: p.description || null,
      material: p.material || null,
      stone: p.stone || null,
      size: p.size || null,
      price: p.price,
      currency: p.currency,
      image_url: p.image || null,
      featured: p.featured,
      in_stock: p.inStock,
      active: p.active,
    };
  }

  function _readLocal(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function _writeLocal(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _migrateLegacy() {
    const cfg = typeof PilaricaConfig !== 'undefined' ? PilaricaConfig : {};
    const key = cfg.productsKey || 'pilarica_products';
    const legacy = cfg.legacyProductsKey || 'pilarica_admin_products';
    const current = _readLocal(key);
    if (current && current.length) return current.map(_normalize);
    const old = _readLocal(legacy);
    if (old && old.length) {
      const migrated = old.map(_normalize);
      _writeLocal(key, migrated);
      return migrated;
    }
    return null;
  }

  function getAccessToken() {
    return sessionStorage.getItem(AUTH_TOKEN_KEY) || '';
  }

  function getSessionEmail() {
    return sessionStorage.getItem(AUTH_EMAIL_KEY) || '';
  }

  function clearSession() {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_EMAIL_KEY);
  }

  function _supabaseHeaders(authenticated = false) {
    const cfg = _cfg();
    const token = authenticated && getAccessToken() ? getAccessToken() : cfg.anonKey;
    return {
      apikey: cfg.anonKey,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async function signIn(email, password) {
    const cfg = _cfg();
    if (!cfg.url || !cfg.anonKey) throw new Error('Supabase no configurado');
    const res = await fetch(`${cfg.url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: cfg.anonKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Credenciales inválidas');
    const data = await res.json();
    sessionStorage.setItem(AUTH_TOKEN_KEY, data.access_token);
    sessionStorage.setItem(AUTH_EMAIL_KEY, email);
    return data;
  }

  function signOut() {
    clearSession();
  }

  async function _fetchProducts(forAdmin = false) {
    const cfg = _cfg();
    if (!cfg.url || !cfg.anonKey) throw new Error('Supabase no configurado');

    const authenticated = forAdmin && !!getAccessToken();
    let url = `${cfg.url}/rest/v1/products?order=created_at.asc`;
    if (!authenticated) url += '&active=eq.true';

    const res = await fetch(url, { headers: _supabaseHeaders(authenticated) });
    if (!res.ok) {
      if (authenticated && res.status === 401) {
        clearSession();
        throw new Error('Sesión expirada');
      }
      throw new Error('Error al cargar productos');
    }
    const rows = await res.json();
    return rows.map(_rowToProduct);
  }

  async function _upsertToSupabase(product) {
    const cfg = _cfg();
    if (!getAccessToken()) throw new Error('Sesión admin requerida');

    const res = await fetch(`${cfg.url}/rest/v1/products?on_conflict=sku`, {
      method: 'POST',
      headers: {
        ..._supabaseHeaders(true),
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(_productToRow(product)),
    });

    if (!res.ok) {
      const detail = await res.text();
      if (res.status === 401) {
        clearSession();
        throw new Error('Sesión expirada. Vuelve a iniciar sesión.');
      }
      if (res.status === 403) {
        throw new Error('Sin permisos de administrador. Ejecuta database/fix-rls.sql en Supabase.');
      }
      throw new Error(detail || 'Error al guardar producto');
    }
    return res.json();
  }

  async function _deleteFromSupabase(sku) {
    const cfg = _cfg();
    if (!getAccessToken()) throw new Error('Sesión admin requerida');

    const res = await fetch(
      `${cfg.url}/rest/v1/products?sku=eq.${encodeURIComponent(sku)}`,
      { method: 'DELETE', headers: _supabaseHeaders(true) }
    );

    if (!res.ok) {
      if (res.status === 401) {
        clearSession();
        throw new Error('Sesión expirada');
      }
      if (res.status === 403) {
        throw new Error('Sin permisos de administrador');
      }
      throw new Error('Error al eliminar producto');
    }
  }

  async function init() {
    if (PilaricaConfig.storage === 'supabase') {
      try {
        _products = await _fetchProducts(false);
      } catch (e) {
        console.warn('[PilaricaStore] Supabase falló, usando local:', e);
        _products = _migrateLegacy() || SEED_PRODUCTS.map(_normalize);
        saveProducts(_products);
      }
    } else {
      _products = _migrateLegacy() || SEED_PRODUCTS.map(_normalize);
      if (!_readLocal(PilaricaConfig.productsKey)) saveProducts(_products);
    }
    _ready = true;
    return _products;
  }

  async function initAdmin() {
    if (PilaricaConfig.storage !== 'supabase') {
      return init();
    }
    if (!getAccessToken()) throw new Error('No autenticado');
    _products = await _fetchProducts(true);
    _ready = true;
    return _products;
  }

  async function reload() {
    if (PilaricaConfig.storage === 'local') {
      const data = _readLocal(PilaricaConfig.productsKey);
      _products = (data && data.length ? data : SEED_PRODUCTS).map(_normalize);
    } else if (PilaricaConfig.storage === 'supabase') {
      _products = await _fetchProducts(false);
    }
    return getProducts();
  }

  function isReady() {
    return _ready;
  }

  function getProducts(includeInactive = false) {
    const list = _products.map(p => ({ ...p }));
    return includeInactive ? list : list.filter(p => p.active !== false);
  }

  function getProductById(id) {
    return _products.find(p => p.id === id) || null;
  }

  function saveProducts(list) {
    _products = list.map(_normalize);
    if (PilaricaConfig.storage === 'local') {
      _writeLocal(PilaricaConfig.productsKey, _products);
    }
    return _products;
  }

  async function upsertProduct(product) {
    const p = _normalize(product);

    if (PilaricaConfig.storage === 'supabase') {
      await _upsertToSupabase(p);
      _products = await _fetchProducts(true);
      return p;
    }

    const idx = _products.findIndex(x => x.id === p.id);
    if (idx >= 0) _products[idx] = p;
    else _products.push(p);
    saveProducts(_products);
    return p;
  }

  async function deleteProduct(id) {
    if (PilaricaConfig.storage === 'supabase') {
      await _deleteFromSupabase(id);
      _products = await _fetchProducts(true);
      return;
    }
    _products = _products.filter(p => p.id !== id);
    saveProducts(_products);
  }

  function getProductImage(product) {
    if (!product) return '';
    if (product.image) return product.image;
    if (product.imageKey && typeof PILARICA_IMAGES !== 'undefined' && PILARICA_IMAGES[product.imageKey]) {
      return PILARICA_IMAGES[product.imageKey];
    }
    return '';
  }

  function getCategoryCover(cat) {
    const fromBento = BENTO_COVERS[cat];
    if (fromBento) return fromBento;
    const first = _products.find(p => p.category === cat && getProductImage(p));
    return first ? getProductImage(first) : '';
  }

  function formatPrice(amount, currency = 'MXN') {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(Number(amount) || 0);
  }

  return {
    CATEGORIES,
    CATEGORY_LABELS,
    CATEGORY_DESCRIPTIONS,
    BENTO_COVERS,
    SEED_PRODUCTS,
    init,
    initAdmin,
    reload,
    isReady,
    getProducts,
    getProductById,
    saveProducts,
    upsertProduct,
    deleteProduct,
    getProductImage,
    getCategoryCover,
    formatPrice,
    signIn,
    signOut,
    getAccessToken,
    getSessionEmail,
    clearSession,
  };
})();

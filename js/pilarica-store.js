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
  let _siteContent = {};
  let _ready = false;

  function _cfg() {
    return PilaricaConfig.supabase || {};
  }

  function _normalize(product) {
    const p = { ...product };
    p.price = Number(p.price) || 0;
    p.featured = !!p.featured;
    p.active = p.active !== false;
    p.currency = p.currency || 'MXN';
    p.image = p.image || '';
    p.imageKey = p.imageKey || '';
    p.images = Array.isArray(p.images) ? p.images.filter(Boolean) : [];
    if (p.stockQty != null && p.stockQty !== '') {
      p.stockQty = Math.max(0, parseInt(p.stockQty, 10) || 0);
    } else {
      p.stockQty = p.inStock === false ? 0 : 1;
    }
    p.inStock = p.stockQty > 0;
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
      images: row.gallery_urls,
      imageKey: '',
      description: row.description,
      featured: row.featured,
      stockQty: row.stock_qty,
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
      gallery_urls: p.images,
      featured: p.featured,
      stock_qty: p.stockQty,
      in_stock: p.stockQty > 0,
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

  async function resetPassword(email) {
    const cfg = _cfg();
    if (!cfg.url || !cfg.anonKey) throw new Error('Supabase no configurado');
    const redirectTo = `${window.location.origin}${window.location.pathname}`;
    const res = await fetch(`${cfg.url}/auth/v1/recover`, {
      method: 'POST',
      headers: {
        apikey: cfg.anonKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, redirect_to: redirectTo }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.msg || err.error_description || 'No se pudo enviar el correo de recuperación');
    }
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

    const res = await fetch(`${cfg.url}/rest/v1/products?sku=eq.${encodeURIComponent(sku)}`, {
      method: 'DELETE',
      headers: _supabaseHeaders(true),
    });

    if (!res.ok) {
      if (res.status === 401) {
        clearSession();
        throw new Error('Sesión expirada. Vuelve a iniciar sesión.');
      }
      if (res.status === 403) {
        throw new Error('Sin permisos de administrador. Ejecuta database/fix-rls.sql en Supabase.');
      }
      const detail = await res.text();
      throw new Error(detail || 'Error al eliminar producto');
    }
  }

  async function _fetchSiteContent() {
    const cfg = _cfg();
    if (!cfg.url || !cfg.anonKey) throw new Error('Supabase no configurado');
    const res = await fetch(`${cfg.url}/rest/v1/site_content?select=section_key,data`, {
      headers: _supabaseHeaders(!!getAccessToken()),
    });
    if (!res.ok) throw new Error('Error al cargar contenido del sitio');
    const rows = await res.json();
    const map = {};
    rows.forEach(row => { map[row.section_key] = row.data || {}; });
    return map;
  }

  const SITE_IMAGES_BUCKET = 'site-images';
  const PRODUCT_IMAGES_BUCKET = 'product-images';

  async function _uploadStorageFile(file, bucket, folder = 'uploads') {
    if (!file) throw new Error('Archivo requerido');
    const cfg = _cfg();
    if (PilaricaConfig.storage === 'supabase') {
      if (!getAccessToken()) throw new Error('Sesión admin requerida');
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const uploadUrl = `${cfg.url}/storage/v1/object/${bucket}/${path}`;

      async function tryUpload(body, headers) {
        return fetch(uploadUrl, {
          method: 'POST',
          headers: {
            apikey: cfg.anonKey,
            Authorization: `Bearer ${getAccessToken()}`,
            'x-upsert': 'true',
            ...headers,
          },
          body,
        });
      }

      const formData = new FormData();
      formData.append('cacheControl', '3600');
      formData.append('', file, file.name || `image.${ext}`);

      let res = await tryUpload(formData, {});
      if (!res.ok) {
        res = await tryUpload(file, {
          'content-type': file.type || 'application/octet-stream',
          'cache-control': 'max-age=3600',
        });
      }

      if (!res.ok) {
        let detail = '';
        try {
          const errBody = await res.json();
          detail = errBody.message || errBody.error || '';
        } catch (_) { /* ignore */ }
        if (res.status === 403) throw new Error('Sin permisos para subir imágenes');
        if (/bucket not found/i.test(detail)) {
          throw new Error(`Bucket ${bucket} inaccesible. Ejecuta database/${bucket === SITE_IMAGES_BUCKET ? 'site' : 'product'}-storage.sql`);
        }
        throw new Error(detail || `Error al subir imagen (${res.status})`);
      }
      return `${cfg.url}/storage/v1/object/public/${bucket}/${path}`;
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('No se pudo leer la imagen'));
      reader.readAsDataURL(file);
    });
  }

  async function uploadSiteImage(file, folder = 'site') {
    return _uploadStorageFile(file, SITE_IMAGES_BUCKET, folder);
  }

  async function uploadProductImage(file, folder = 'catalog') {
    return _uploadStorageFile(file, PRODUCT_IMAGES_BUCKET, folder);
  }

  async function _saveSiteSectionToSupabase(sectionKey, data) {
    const cfg = _cfg();
    if (!getAccessToken()) throw new Error('Sesión admin requerida');
    const res = await fetch(`${cfg.url}/rest/v1/site_content?on_conflict=section_key`, {
      method: 'POST',
      headers: {
        ..._supabaseHeaders(true),
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify({ section_key: sectionKey, data }),
    });
    if (!res.ok) {
      if (res.status === 403) throw new Error('Sin permisos para editar contenido');
      throw new Error('Error al guardar contenido');
    }
    return res.json();
  }

  function _readSiteContentLocal() {
    return _readLocal(PilaricaConfig.siteContentKey) || {};
  }

  function _writeSiteContentLocal(data) {
    _writeLocal(PilaricaConfig.siteContentKey, data);
  }

  async function initSiteContent() {
    const defaults = typeof PilaricaSiteContent !== 'undefined'
      ? PilaricaSiteContent.DEFAULTS
      : {};
    if (PilaricaConfig.storage === 'supabase') {
      try {
        _siteContent = await _fetchSiteContent();
      } catch (e) {
        console.warn('[PilaricaStore] Contenido remoto falló, usando local:', e);
        _siteContent = _readSiteContentLocal();
      }
    } else {
      _siteContent = _readSiteContentLocal();
    }
    if (!Object.keys(_siteContent).length) {
      _siteContent = { ...defaults };
      _writeSiteContentLocal(_siteContent);
    }
    return getSiteContent();
  }

  async function reloadSiteContent() {
    return initSiteContent();
  }

  function getSiteContent() {
    if (typeof PilaricaSiteContent !== 'undefined') {
      return PilaricaSiteContent.merge(_siteContent);
    }
    return { ..._siteContent };
  }

  function getSiteSection(key) {
    return getSiteContent()[key] || null;
  }

  async function saveSiteSection(key, data) {
    _siteContent[key] = data;
    if (PilaricaConfig.storage === 'supabase') {
      await _saveSiteSectionToSupabase(key, data);
    } else {
      _writeSiteContentLocal(_siteContent);
    }
    return data;
  }

  async function restoreSiteContentDefaults() {
    if (typeof PilaricaSiteContent === 'undefined') {
      throw new Error('Contenido por defecto no disponible');
    }
    const defaults = PilaricaSiteContent.DEFAULTS;
    for (const key of Object.keys(defaults)) {
      await saveSiteSection(key, { ...defaults[key] });
    }
    return getSiteContent();
  }

  function getAppBasePath() {
    if (typeof window === 'undefined') return '';
    const p = window.location.pathname;
    if (p.endsWith('/index.html')) return p.slice(0, -('/index.html'.length));
    return '';
  }

  function buildSitePath(routePath) {
    const base = (PilaricaConfig.siteBaseUrl || '').replace(/\/$/, '') || getAppBasePath();
    const clean = routePath.startsWith('/') ? routePath : `/${routePath}`;
    const joined = `${base}${clean}`.replace(/\/{2,}/g, '/');
    return joined || '/';
  }

  function getProductImages(product) {
    const p = _normalize(product);
    const main = getProductImage(p);
    const extras = p.images.filter(u => u && u !== main);
    return main ? [main, ...extras] : extras;
  }

  function getProductUrl(sku) {
    const path = buildSitePath(`/producto/${encodeURIComponent(sku)}`);
    if (PilaricaConfig.siteBaseUrl) return path;
    if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
      return `index.html#/producto/${encodeURIComponent(sku)}`;
    }
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${path}`;
    }
    return path;
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
    await initSiteContent();
    _ready = true;
    return _products;
  }

  async function initAdmin() {
    if (PilaricaConfig.storage !== 'supabase') {
      await init();
      await initCertificates();
      return _products;
    }
    if (!getAccessToken()) throw new Error('No autenticado');
    _products = await _fetchProducts(true);
    await initSiteContent();
    await initCertificates();
    _ready = true;
    return _products;
  }

  let _certificates = [];

  function _rowToCert(row) {
    return {
      serial: row.serial,
      productName: row.product_name,
      material: row.material || '',
      stone: row.stone || 'Sin piedra',
      size: row.size || '',
      price: row.price_label || '',
      clientName: row.client_name,
      purchaseDate: row.purchase_date,
      issuedAt: row.issued_at,
    };
  }

  function _readCertsLocal() {
    return _readLocal(PilaricaConfig.certsKey) || [];
  }

  function _writeCertsLocal(list) {
    _writeLocal(PilaricaConfig.certsKey, list);
  }

  async function _fetchCertificates() {
    const cfg = _cfg();
    const res = await fetch(`${cfg.url}/rest/v1/certificates?order=issued_at.desc`, {
      headers: _supabaseHeaders(true),
    });
    if (!res.ok) {
      if (res.status === 401) {
        clearSession();
        throw new Error('Sesión expirada');
      }
      if (res.status === 403) throw new Error('Sin permisos para certificados');
      throw new Error('Error al cargar certificados');
    }
    const rows = await res.json();
    return rows.map(_rowToCert);
  }

  async function initCertificates() {
    if (PilaricaConfig.storage === 'supabase' && getAccessToken()) {
      try {
        _certificates = await _fetchCertificates();
      } catch (e) {
        console.warn('[PilaricaStore] Certificados remotos fallaron, usando local:', e);
        _certificates = _readCertsLocal();
      }
    } else {
      _certificates = _readCertsLocal();
    }
    return getCertificates();
  }

  function getCertificates() {
    return _certificates.map(c => ({ ...c }));
  }

  function getCertificateBySerial(serial) {
    return _certificates.find(c => c.serial === serial) || null;
  }

  async function _nextCertSerial() {
    const parseSerial = (serial) => parseInt(String(serial || '').replace('PIL-', ''), 10);
    if (PilaricaConfig.storage === 'supabase' && getAccessToken()) {
      const cfg = _cfg();
      const res = await fetch(`${cfg.url}/rest/v1/certificates?select=serial&order=serial.desc&limit=1`, {
        headers: _supabaseHeaders(true),
      });
      if (res.ok) {
        const rows = await res.json();
        const last = rows[0] ? parseSerial(rows[0].serial) : 100;
        return 'PIL-' + String((last || 100) + 1).padStart(6, '0');
      }
    }
    const local = _certificates.length
      ? Math.max(..._certificates.map(c => parseSerial(c.serial)).filter(n => !isNaN(n)))
      : 100;
    return 'PIL-' + String(local + 1).padStart(6, '0');
  }

  async function createCertificate(data) {
    const serial = await _nextCertSerial();
    const cert = {
      serial,
      productName: data.productName,
      material: data.material || '',
      stone: data.stone || 'Sin piedra',
      size: data.size || '',
      price: data.price || '',
      clientName: data.clientName,
      purchaseDate: data.purchaseDate,
      issuedAt: new Date().toISOString(),
    };

    if (PilaricaConfig.storage === 'supabase' && getAccessToken()) {
      const cfg = _cfg();
      const res = await fetch(`${cfg.url}/rest/v1/certificates`, {
        method: 'POST',
        headers: {
          ..._supabaseHeaders(true),
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          serial,
          product_name: cert.productName,
          material: cert.material,
          stone: cert.stone,
          size: cert.size,
          price_label: cert.price,
          client_name: cert.clientName,
          purchase_date: cert.purchaseDate,
        }),
      });
      if (!res.ok) {
        if (res.status === 403) throw new Error('Sin permisos para certificados. Ejecuta database/certificates-rls.sql');
        throw new Error('Error al guardar certificado');
      }
      const rows = await res.json();
      const saved = _rowToCert(rows[0]);
      _certificates.unshift(saved);
      return saved;
    }

    _certificates.unshift(cert);
    _writeCertsLocal(_certificates);
    return cert;
  }

  async function reload() {
    if (PilaricaConfig.storage === 'local') {
      const data = _readLocal(PilaricaConfig.productsKey);
      _products = (data && data.length ? data : SEED_PRODUCTS).map(_normalize);
    } else if (PilaricaConfig.storage === 'supabase') {
      _products = await _fetchProducts(false);
      await reloadSiteContent();
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

  async function deactivateProduct(id) {
    const existing = _products.find(p => p.id === id);
    if (!existing) return;
    await upsertProduct({ ...existing, active: false, stockQty: 0 });
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
    const covers = getSiteSection('category_covers');
    if (covers && covers[cat]) return covers[cat];
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
    deactivateProduct,
    deleteProduct,
    getProductImage,
    getProductImages,
    getCategoryCover,
    formatPrice,
    getProductUrl,
    getAppBasePath,
    buildSitePath,
    initSiteContent,
    reloadSiteContent,
    getSiteContent,
    getSiteSection,
    saveSiteSection,
    restoreSiteContentDefaults,
    uploadSiteImage,
    uploadProductImage,
    initCertificates,
    getCertificates,
    getCertificateBySerial,
    createCertificate,
    signIn,
    signOut,
    resetPassword,
    getAccessToken,
    getSessionEmail,
    clearSession,
  };
})();

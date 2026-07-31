# Pilarica — Tienda y panel admin

Sitio estático (HTML + JavaScript) con backend **Supabase** (PostgreSQL, Auth, Storage).

## URLs locales

```bash
npx serve . -s -l tcp://localhost:63885
```

El flag `-s` activa rutas limpias (`/catalogo`, `/producto/SKU`) como en producción.  
`serve.json` evita que el admin quede atrapado en la SPA: usa **`/admin.html`** (no `/admin`).

- Tienda: http://localhost:63885/
- Catálogo: http://localhost:63885/catalogo
- Admin: http://localhost:63885/admin.html

## Configuración

Editar `js/pilarica-config.js`:

- `storage`: `'supabase'` (producción) o `'local'` (demo sin nube)
- `supabase.url` y `supabase.anonKey`
- `siteBaseUrl`: dejar vacío hasta tener dominio en producción

## SQL en Supabase (orden)

1. `database/schema.sql`
2. `database/site-content.sql`
3. `database/site-content-sections.sql`
4. `database/seed.sql` (opcional, productos demo)
5. Crear usuario en **Authentication → Users**
6. `database/setup-admin.sql` o `database/fix-rls.sql` (ajustar email admin)
7. `database/site-storage.sql` — imágenes del sitio
8. `database/product-storage.sql` — fotos de productos
9. `database/product-gallery.sql` — galería extra por producto
10. `database/product-stock.sql` — cantidad en inventario
11. `database/certificates-rls.sql` — permisos certificados

## Módulos

| Módulo | Dónde |
|--------|--------|
| Catálogo | Admin → Productos · Supabase `products` |
| Contenido web | Admin → Contenido web · Supabase `site_content` |
| Imágenes sitio | Bucket `site-images` |
| Imágenes productos | Bucket `product-images` |
| Certificados | Admin → Certificados · Supabase `certificates` |
| Checkout | WhatsApp (sin pagos en línea por ahora) |

## Deploy (Hostinger u otro hosting)

1. Sube **toda la carpeta** del proyecto al `public_html` de Hostinger.
2. Incluye `.htaccess` (Apache) para rutas SPA (`/catalogo`, `/producto/SKU`).
3. Activa **SSL/HTTPS** en el panel de Hostinger.
4. Configura `siteBaseUrl` en `js/pilarica-config.js` con tu dominio final (ej. `https://pilarica.com`).
5. En Supabase Auth → URL Configuration, agrega `https://tudominio.com/admin.html` como redirect permitido.

También incluye `_redirects` (Netlify) y `vercel.json` (Vercel) si usas esos servicios.

URLs recomendadas: `https://tudominio.com/` (inicio), `/catalogo`, `/producto/SKU` — sin `#` ni `index.html` visible.

Documentación detallada: `database/DOCUMENTACION-BASE-DE-DATOS.md`

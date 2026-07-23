# Pilarica — Tienda y panel admin

Sitio estático (HTML + JavaScript) con backend **Supabase** (PostgreSQL, Auth, Storage).

## URLs locales

```bash
npx serve . -s -l tcp://localhost:63885
```

El flag `-s` activa rutas limpias (`/catalogo`, `/producto/SKU`) como en producción.

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

## Deploy (pendiente dominio)

Subir carpeta del proyecto a Netlify, Vercel o similar. Configurar `siteBaseUrl` con la URL final.

Incluye `_redirects` para Netlify (SPA: todas las rutas sirven `index.html`). En Vercel, equivalente con `rewrites` en `vercel.json`.

URLs recomendadas en producción: `https://tudominio.com/` (inicio), `/catalogo`, `/producto/SKU` — sin `#` ni `index.html` visible.

Documentación detallada: `database/DOCUMENTACION-BASE-DE-DATOS.md`

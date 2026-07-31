# Pilarica — Informe de seguridad

**Fecha:** 4 de julio de 2026  
**Alcance:** Tienda pública (`index.html`) + panel admin (`admin.html`) + Supabase  
**Nivel general:** Adecuado para lanzamiento interno / MVP con admin limitado. Mejorable antes de escala o datos muy sensibles.

---

## 1. Resumen ejecutivo

Pilarica usa **Supabase** con **Row Level Security (RLS)** como barrera principal. La clave `anon` del proyecto va en el frontend (es el diseño normal de Supabase); la seguridad real depende de las políticas RLS, no de ocultar esa clave.

| Área | Estado | Nota |
|------|--------|------|
| Acceso a base de datos | ✅ Bien | RLS en productos, contenido, certificados, storage |
| Autenticación admin | ✅ Bien | Supabase Auth + tabla `admin_profiles` |
| Exposición de claves | ⚠️ Aceptable | Solo `anon` en cliente; nunca usar `service_role` en HTML |
| Storage (imágenes) | ⚠️ Aceptable | Buckets públicos de lectura; escritura solo admin |
| Tienda pública | ✅ Bien | Solo lectura de productos activos y contenido |
| Certificados | ✅ Bien | Solo admins autenticados |
| Sesión admin | ⚠️ Mejorable | Token en `sessionStorage`, sin refresh automático |
| Headers / CSP | ❌ Pendiente | Depende del hosting |
| Pagos / pedidos | N/A | Fuera de alcance actual |

---

## 2. Lo que ya está protegido

### 2.1 Row Level Security (PostgreSQL)

| Tabla / recurso | Lectura pública | Escritura admin |
|-----------------|-----------------|-----------------|
| `products` | Solo `active = true` | Solo si existe fila en `admin_profiles` con `role = admin` |
| `site_content` | Sí (contenido del sitio) | Solo admin |
| `certificates` | No | Solo admin |
| `storage.objects` (`site-images`, `product-images`) | Lectura pública de archivos | Subida/actualización solo admin |
| `admin_profiles` | Cada usuario lee **solo su propia** fila | Necesario para que RLS de otras tablas funcione |

Scripts relevantes: `fix-rls.sql`, `site-storage.sql`, `product-storage.sql`, `certificates-rls.sql`.

### 2.2 Autenticación del panel admin

- Login con **email + contraseña** vía Supabase Auth (no contraseña hardcodeada en modo producción).
- Token JWT guardado en **`sessionStorage`** (se borra al cerrar pestaña; no persiste como cookie larga).
- `admin.html` tiene `<meta name="robots" content="noindex, nofollow">` para no indexar el panel.

### 2.3 Separación tienda / admin

- La tienda **no puede** crear productos, subir imágenes ni emitir certificados (403 sin token admin).
- El panel duplicado de certificados en la tienda fue desactivado; `#/dashboard` redirige a `admin.html`.
- Carrito y datos de visita siguen en `localStorage` del navegador (no contienen datos bancarios).

### 2.4 Credenciales sensibles

- `database/ENTREGA-Y-CREDENCIALES.md` está en **`.gitignore`** (no debe subirse a GitHub).
- No hay `service_role` key en el código frontend.

---

## 3. Riesgos actuales (con mitigación)

### 3.1 Clave anon en el cliente — Riesgo bajo (diseño esperado)

**Qué es:** Cualquiera puede ver la URL y la `anonKey` en `pilarica-config.js`.

**Por qué no es grave:** Supabase está pensado para eso. Sin JWT de admin, las políticas RLS bloquean escritura y datos privados.

**Mejora opcional:** Rotar la anon key si alguna vez se filtró junto con políticas mal configuradas.

---

### 3.2 Token admin sin refresh — Riesgo bajo–medio

**Qué pasa:** Si la sesión expira, el admin debe volver a iniciar sesión. No hay robo automático, pero puede interrumpir trabajo.

**Mejora recomendada:** Implementar refresh token de Supabase o aviso claro de “sesión expirada” (parcialmente ya existe).

---

### 3.3 Buckets Storage públicos — Riesgo bajo

**Qué pasa:** Las URLs de imágenes son públicas (necesario para mostrarlas en la tienda sin login).

**Mitigación actual:** Solo admins pueden **subir** o **borrar** archivos.

**Mejora opcional:** Validar tipo MIME y tamaño máximo en backend (límite de bucket ya en 50 MB).

---

### 3.4 Contenido HTML editable (XSS) — Riesgo bajo

**Qué pasa:** Títulos y textos del sitio se guardan con HTML (`<em>`, `<br>`, etc.) y se renderizan con `innerHTML`.

**Mitigación actual:** Solo usuarios **admin** pueden editar ese contenido.

**Mejora recomendada:** Si en el futuro hay más editores, sanitizar HTML al guardar (DOMPurify o whitelist de etiquetas).

---

### 3.5 Enlace al admin en el footer — Riesgo bajo

**Qué pasa:** La tienda enlaza a `admin.html`; es fácil de encontrar.

**Mitigación:** Sin credenciales válidas no hay acceso. No es seguridad por oscuridad.

**Mejora opcional:** Quitar el enlace público o usar URL menos obvia; activar **2FA** en Supabase Auth para admins.

---

### 3.6 Modo demo local — Riesgo solo en desarrollo

**Qué pasa:** Con `storage: 'local'`, el admin acepta credenciales demo en código.

**Mitigación:** En producción debe usarse `storage: 'supabase'` (ya configurado).

---

### 3.7 Tablas `orders` / `order_items` — Riesgo futuro

**Qué pasa:** Existen en `schema.sql` pero **sin políticas RLS** definidas.

**Mitigación actual:** No se usan desde la app; acceso denegado por defecto.

**Antes de Fase 2 (pagos):** Definir RLS estricto por cliente autenticado o solo service role en backend.

---

## 4. Mejoras recomendadas (prioridad)

### Alta (antes o al publicar en dominio real)

1. **HTTPS obligatorio** en el hosting (Netlify/Vercel lo dan gratis).
2. **Contraseñas fuertes** para todos los usuarios en Supabase Auth.
3. **Ejecutar todos los SQL de permisos** en producción (`fix-rls`, storage, certificates-rls).
4. **No commitear** `.env`, credenciales ni `ENTREGA-Y-CREDENCIALES.md`.
5. Configurar **`siteBaseUrl`** cuando exista dominio (evita links incorrectos en WhatsApp, no es seguridad directa pero evita phishing accidental).

### Media

6. **Autenticación de dos factores (2FA)** para cuentas admin en Supabase Dashboard.
7. **Content-Security-Policy (CSP)** en el hosting para limitar scripts externos.
8. **Validación de archivos** en subida: solo `image/jpeg`, `image/png`, `image/webp`; rechazar SVG (puede llevar scripts).
9. **Rate limiting** en Supabase (plan Pro) o Cloudflare delante del sitio.
10. **Restablecer contraseña** self-service para admins (Supabase “Forgot password”).

### Baja / cuando crezcan

11. Registro de auditoría (quién cambió qué producto o certificado).
12. Backups automáticos verificados (Supabase incluye backups según plan).
13. Escaneo de dependencias si se añade build/npm.
14. Verificación pública de certificados por serial (solo lectura, sin datos del cliente).

---

## 5. Checklist rápido para el responsable técnico

- [ ] RLS activo en todas las tablas de negocio
- [ ] Admin registrado en `admin_profiles` con email correcto
- [ ] Buckets `site-images` y `product-images` creados con políticas
- [ ] `certificates-rls.sql` ejecutado
- [ ] `service_role` key **solo** en servidor / Dashboard, nunca en HTML
- [ ] `admin.html` no indexado (`noindex`)
- [ ] Hosting con HTTPS
- [ ] Credenciales de entrega fuera de Git

---

## 6. Conclusión

Para una joyería con **pocos administradores**, **checkout por WhatsApp** y **sin pagos en línea**, el modelo actual es **razonablemente seguro** si se mantienen las políticas RLS y las cuentas admin protegidas.

Los mayores saltos de seguridad vendrán con: **dominio + HTTPS + CSP**, **2FA en admin**, y **RLS bien diseñado** cuando se activen pedidos y pagos.

---

*Documento interno — Pilarica · Julio 2026*

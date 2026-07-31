-- Pilarica · Storage para imágenes del sitio (Contenido web)
-- Ejecutar en SQL Editor después de fix-rls.sql
-- Seguro de ejecutar varias veces.

-- ─── 1. Crear bucket público ───
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 52428800, null)
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit;

-- ─── 2. CRÍTICO: sin esto el upload responde "Bucket not found" aunque el bucket exista ───
drop policy if exists "Authenticated read buckets" on storage.buckets;
create policy "Authenticated read buckets"
  on storage.buckets for select
  to authenticated
  using (true);

-- ─── 3. Políticas en storage.objects ───
drop policy if exists "Public read site images" on storage.objects;
create policy "Public read site images"
  on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "Admin upload site images" on storage.objects;
create policy "Admin upload site images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'site-images'
    and exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

drop policy if exists "Admin update site images" on storage.objects;
create policy "Admin update site images"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'site-images'
    and exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  )
  with check (
    bucket_id = 'site-images'
    and exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

drop policy if exists "Admin delete site images" on storage.objects;
create policy "Admin delete site images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'site-images'
    and exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

-- ─── 4. Verificar (debe devolver 1 fila: site-images | true) ───
select id, name, public from storage.buckets where id = 'site-images';

-- Pilarica · Storage para fotos de productos (catálogo)
-- Ejecutar en SQL Editor después de fix-rls.sql
-- Seguro de ejecutar varias veces.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 52428800, null)
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit;

drop policy if exists "Authenticated read buckets for products" on storage.buckets;
-- La política global de buckets ya existe si corriste site-storage.sql; esta es redundante pero segura:
drop policy if exists "Authenticated read buckets" on storage.buckets;
create policy "Authenticated read buckets"
  on storage.buckets for select
  to authenticated
  using (true);

drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "Admin upload product images" on storage.objects;
create policy "Admin upload product images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'product-images'
    and exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

drop policy if exists "Admin update product images" on storage.objects;
create policy "Admin update product images"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'product-images'
    and exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  )
  with check (
    bucket_id = 'product-images'
    and exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

drop policy if exists "Admin delete product images" on storage.objects;
create policy "Admin delete product images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'product-images'
    and exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

select id, name, public from storage.buckets where id = 'product-images';

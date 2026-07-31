-- Pilarica · Permisos explícitos para certificados (admin)
-- Ejecutar en SQL Editor si falla guardar certificados (403)

drop policy if exists "Admin manage certificates" on certificates;

create policy "Admin select certificates"
  on certificates for select
  to authenticated
  using (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

create policy "Admin insert certificates"
  on certificates for insert
  to authenticated
  with check (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

create policy "Admin update certificates"
  on certificates for update
  to authenticated
  using (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  )
  with check (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

create policy "Admin delete certificates"
  on certificates for delete
  to authenticated
  using (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

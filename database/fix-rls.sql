-- Pilarica · Corregir permisos de administrador (ejecutar en SQL Editor)
-- Soluciona el error 403 al guardar productos desde el panel admin.

-- ─── 1. Permitir que cada admin lea su propio perfil (necesario para RLS) ───
alter table admin_profiles enable row level security;

drop policy if exists "Users read own admin profile" on admin_profiles;
create policy "Users read own admin profile"
  on admin_profiles for select
  using (auth.uid() = user_id);

-- ─── 2. Recrear políticas de productos con WITH CHECK explícito ───
drop policy if exists "Admin manage products" on products;
drop policy if exists "Admin insert products" on products;
drop policy if exists "Admin update products" on products;
drop policy if exists "Admin delete products" on products;

create policy "Admin select products"
  on products for select
  using (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

create policy "Admin insert products"
  on products for insert
  with check (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

create policy "Admin update products"
  on products for update
  using (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  )
  with check (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

create policy "Admin delete products"
  on products for delete
  using (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

-- ─── 3. Registrar tu usuario como admin (cambia el email si es otro) ───
insert into admin_profiles (user_id, full_name, role)
select id, 'Administrador Pilarica', 'admin'
from auth.users
where email = 'admin@pilaricajoyas.com.mx'
on conflict (user_id) do update set role = 'admin';

-- ─── 4. Verificar (debe devolver 1 fila con tu correo y role = admin) ───
select u.email, p.role, p.full_name
from admin_profiles p
join auth.users u on u.id = p.user_id;

-- Pilarica · Configurar primer administrador en Supabase
-- Ejecutar DESPUÉS de schema.sql

-- PASO 1 (manual en el dashboard):
--   Authentication → Users → Add user → Create new user
--   Email:    mrk@pilaricajoyas.com.mx  (o el correo que prefieran)
--   Password: contraseña segura definida en el dashboard (no la subas a Git)
--   Marcar: Auto Confirm User

-- PASO 2 (ejecutar este SQL — cambia el email si usaste otro):
insert into admin_profiles (user_id, full_name, role)
select id, 'Administrador Pilarica', 'admin'
from auth.users
where email = 'mrk@pilaricajoyas.com.mx'
on conflict (user_id) do nothing;

-- Verificar:
-- select u.email, p.role from admin_profiles p join auth.users u on u.id = p.user_id;

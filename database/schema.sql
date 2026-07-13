-- Pilarica · Esquema inicial (PostgreSQL / Supabase)
-- Pagos y pedidos: tablas preparadas, lógica de checkout para después.

-- Extensiones útiles en Supabase
create extension if not exists "pgcrypto";

-- ─── Productos ───────────────────────────────────────────────
create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  sku           text not null unique,
  name          text not null,
  category      text not null check (category in ('anillos','collares','aretes','pulseras')),
  description   text,
  material      text,
  stone         text,
  size          text,
  price         numeric(12,2) not null default 0,
  currency      text not null default 'MXN',
  image_url     text,
  featured      boolean not null default false,
  in_stock      boolean not null default true,
  active        boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists products_category_idx on products (category);
create index if not exists products_featured_idx on products (featured) where featured = true;

-- ─── Certificados de autenticidad ───────────────────────────
create table if not exists certificates (
  id              uuid primary key default gen_random_uuid(),
  serial          text not null unique,
  product_id      uuid references products(id) on delete set null,
  product_name    text not null,
  material        text,
  stone           text,
  size            text,
  price_label     text,
  client_name     text not null,
  purchase_date   date not null,
  issued_at       timestamptz not null default now(),
  issued_by       uuid references auth.users(id)
);

create index if not exists certificates_serial_idx on certificates (serial);

-- ─── Perfiles admin (vinculado a Supabase Auth) ──────────────
create table if not exists admin_profiles (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  role        text not null default 'admin' check (role in ('admin','staff')),
  created_at  timestamptz not null default now()
);

alter table admin_profiles enable row level security;

create policy "Users read own admin profile"
  on admin_profiles for select
  using (auth.uid() = user_id);

-- ─── Pedidos (fase 2 — pagos después) ───────────────────────
create table if not exists orders (
  id            uuid primary key default gen_random_uuid(),
  order_number  text unique,
  status        text not null default 'draft' check (status in ('draft','pending','paid','shipped','cancelled')),
  customer_name text,
  customer_email text,
  customer_phone text,
  subtotal      numeric(12,2) not null default 0,
  currency      text not null default 'MXN',
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  product_id  uuid references products(id) on delete set null,
  sku         text not null,
  name        text not null,
  unit_price  numeric(12,2) not null,
  quantity    int not null default 1 check (quantity > 0)
);

-- Trigger updated_at
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_updated_at on products;
create trigger products_updated_at
  before update on products
  for each row execute function set_updated_at();

drop trigger if exists orders_updated_at on orders;
create trigger orders_updated_at
  before update on orders
  for each row execute function set_updated_at();

-- ─── Row Level Security (ejemplo Supabase) ───────────────────
alter table products enable row level security;
alter table certificates enable row level security;

-- Público: solo lectura de productos activos
create policy "Public read active products"
  on products for select
  using (active = true);

-- Admin: CRUD productos (requiere rol en admin_profiles)
drop policy if exists "Admin manage products" on products;
drop policy if exists "Admin select products" on products;
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

create policy "Admin manage certificates"
  on certificates for all
  using (
    exists (select 1 from admin_profiles where user_id = auth.uid())
  );

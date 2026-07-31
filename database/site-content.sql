-- Pilarica · Contenido editable del sitio (hero, about, portadas catálogo, etc.)
-- Ejecutar en SQL Editor después de schema.sql

create table if not exists site_content (
  section_key   text primary key,
  data          jsonb not null default '{}'::jsonb,
  updated_at    timestamptz not null default now()
);

alter table site_content enable row level security;

drop policy if exists "Public read site content" on site_content;
create policy "Public read site content"
  on site_content for select
  using (true);

drop policy if exists "Admin select site content" on site_content;
create policy "Admin select site content"
  on site_content for select
  using (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

drop policy if exists "Admin insert site content" on site_content;
create policy "Admin insert site content"
  on site_content for insert
  with check (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

drop policy if exists "Admin update site content" on site_content;
create policy "Admin update site content"
  on site_content for update
  using (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  )
  with check (
    exists (select 1 from admin_profiles where user_id = auth.uid() and role = 'admin')
  );

-- Datos iniciales (textos actuales del sitio; imágenes como rutas editables)
insert into site_content (section_key, data) values
  ('hero', '{
    "eyebrow": "Nueva Colección 2025",
    "titleHtml": "El lujo<br/>que <em>mereces</em><br/>sentir.",
    "body": "Piezas únicas elaboradas con los más finos materiales. Diseños que perduran, precios que sorprenden. Cada joya, un certificado de autenticidad.",
    "imageUrl": "assets/products/pulseras/pulsera-oro-turquesa-piscina.png",
    "stats": [
      {"num": "18k", "label": "Oro certificado"},
      {"num": "100%", "label": "Autenticidad"},
      {"num": "+200", "label": "Diseños únicos"},
      {"num": "5*", "label": "Garantía total"}
    ]
  }'::jsonb),
  ('quote', $json${
    "textHtml": "\"En Pilarica creemos que el lujo no debe ser un privilegio de pocos. Cada pieza es <strong>artesanía honesta</strong>, materiales excepcionales y un precio que celebra, no excluye.\"",
    "cite": "- Pilarica, Joyería de Autor"
  }$json$::jsonb),
  ('featured', '{
    "eyebrow": "Piezas destacadas",
    "titleHtml": "Nuestra <em>selección</em>",
    "body": "Cada pieza ha sido seleccionada por su diseño excepcional y la calidad de sus materiales. Porque mereces lo mejor."
  }'::jsonb),
  ('brand', '{
    "eyebrow": "Nuestra promesa",
    "titleHtml": "Joyería con <em>alma</em><br/>y propósito",
    "body": "Inspiradas en la devoción y permanencia de la Virgen del Pilar, cada pieza nace con la intención de acompañarte en los momentos que importan. Tradición, calidad y una presencia que se siente desde el primer instante."
  }'::jsonb),
  ('catalog_hero', '{
    "eyebrow": "Colección Pilarica 2025",
    "titleHtml": "Nuestras <em>piezas</em>",
    "body": "Joyas que cuentan historias. Cada una, única. Cada una, certificada."
  }'::jsonb),
  ('category_covers', '{
    "anillos": "assets/products/bento/bento-anillos.png",
    "collares": "assets/products/bento/bento-collares.png",
    "aretes": "assets/products/bento/bento-aretes.png",
    "pulseras": "assets/products/bento/bento-pulseras.png"
  }'::jsonb),
  ('about_hero', '{
    "eyebrow": "Nuestra historia",
    "titleHtml": "Más que joyas,<br/><em>momentos</em>",
    "story": "Pilarica nació de una convicción simple: el lujo verdadero no debería ser un privilegio de pocos. Inspiradas en la permanencia y devoción de la Virgen del Pilar, creamos piezas que acompañan los momentos que importan.",
    "imageUrl": "assets/products/anillos/coleccion-esmeralda-lifestyle.png"
  }'::jsonb),
  ('about_mission', '{
    "titleHtml": "Nuestra<br/><em>misión</em>",
    "body": "Democratizar el acceso a la joyería de alta calidad, sin sacrificar ni el diseño ni los materiales. Cada pieza lleva consigo la promesa de autenticidad y el compromiso de un precio justo."
  }'::jsonb)
on conflict (section_key) do nothing;

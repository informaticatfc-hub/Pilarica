-- Galería adicional por producto (imagen principal sigue en image_url)
alter table products
  add column if not exists gallery_urls jsonb not null default '[]'::jsonb;

comment on column products.gallery_urls is 'URLs extra para la ficha del producto; image_url es la portada';

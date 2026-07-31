-- Cantidad en inventario por pieza (0 = agotado)
alter table products
  add column if not exists stock_qty integer not null default 1 check (stock_qty >= 0);

comment on column products.stock_qty is 'Unidades disponibles; in_stock se sincroniza como stock_qty > 0';

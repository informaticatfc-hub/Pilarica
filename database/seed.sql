-- Pilarica · Productos de demostración (opcional)
-- Ejecutar DESPUÉS de schema.sql, solo si quieres llenar el catálogo de prueba.
-- Si prefieres empezar vacío, omite este archivo y agrega piezas desde el admin más adelante.

insert into products (sku, name, category, description, material, stone, size, price, currency, image_url, featured, in_stock, active)
values
  ('PIL-001', 'Collar Candy Baguette', 'collares',
   'Cadena paperclip en oro 18k con colgante rectangular de esmalte rosa y diamantes baguette.',
   'Oro 18k', 'Diamantes Baguette', '42 cm', 48500, 'MXN', null, true, true, true),

  ('PIL-002', 'Pulsera Marquise Star', 'pulseras',
   'Pulsera rígida de bolas texturizadas en oro 18k con medallones de diamantes.',
   'Oro 18k', 'Diamantes Marquise & Baguette', '17 cm', 62000, 'MXN', null, true, true, true),

  ('PIL-003', 'Collar Doble Corazón', 'collares',
   'Dos corazones en pavé total de diamantes sobre cadena delicada de oro blanco.',
   'Oro Blanco 18k', 'Pavé de Diamantes', '45 cm', 55000, 'MXN', null, true, true, true),

  ('PIL-004', 'Anillo Pear Bicolor', 'anillos',
   'Anillo abierto con alternancia de diamantes pera amarillos y blancos.',
   'Oro 18k', 'Diamantes Amarillos & Blancos', 'Talla 14', 38000, 'MXN', null, true, true, true),

  ('PIL-005', 'Aretes Corazón Zafiro', 'aretes',
   'Aretes en forma de corazón con zafiro azul central rodeado de diamantes.',
   'Oro Rose 18k', 'Zafiro Azul & Diamantes', '1.8 cm', 42000, 'MXN', null, true, true, true),

  ('PIL-006', 'Collar Tennis Diamantes', 'collares',
   'Elegante collar tennis con diamantes engarzados en oro blanco.',
   'Oro Blanco 18k', 'Diamantes', '40 cm', 72000, 'MXN',
   'assets/products/collares/collar-tennis-diamantes.png', false, true, true),

  ('PIL-007', 'Collar Cruz Zafiro', 'collares',
   'Dije en forma de cruz con zafiros rectangulares rodeados de brillantes.',
   'Oro Amarillo 18k', 'Zafiro & Diamantes', '45 cm', 58000, 'MXN',
   'assets/products/collares/collar-cruz-zafiro-oro.png', false, true, true),

  ('PIL-008', 'Stack Anillos Oro & Diamante', 'anillos',
   'Combinación de anillos en oro amarillo y blanco con pavé de diamantes.',
   'Oro 18k', 'Diamantes', 'Talla 12–14', 45000, 'MXN',
   'assets/products/anillos/anillos-stack-oro-diamantes.png', false, true, true)

on conflict (sku) do nothing;

/**
 * Configuración de datos — Pilarica
 * Modo actual: local (localStorage, mismo navegador).
 * Cuando tengan proyecto Supabase, cambien storage a 'supabase' y llenen las URLs.
 */
const PilaricaConfig = {
  storage: 'supabase',
  productsKey: 'pilarica_products',
  legacyProductsKey: 'pilarica_admin_products',
  certsKey: 'pilarica_certs',
  supabase: {
    url: 'https://trhmmdtkewouinciiwsb.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyaG1tZHRrZXdvdWluY2lpd3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5NzEwMzUsImV4cCI6MjA5OTU0NzAzNX0.lhuwPA_OxGeSaYAI2TJnIS8mUS9l_szVwxJpALAi50U',
  },
};


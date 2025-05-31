import { createClient } from '@supabase/supabase-js';

const supabaseUrlProdutos = import.meta.env.VITE_SUPABASE_URL_PRODUTOS;
const supabaseAnonKeyProdutos = import.meta.env.VITE_SUPABASE_ANON_KEY_PRODUTOS;

export const supabaseProdutos = createClient(supabaseUrlProdutos, supabaseAnonKeyProdutos, {
  auth: {
    storageKey: 'supabase.auth.produtos' // chave exclusiva para armazenamento local
  }
});


const supabaseUrlUsuarios = import.meta.env.VITE_SUPABASE_URL_USUARIOS;
const supabaseAnonKeyUsuarios = import.meta.env.VITE_SUPABASE_ANON_KEY_USUARIOS;

export const supabaseUsuarios = createClient(supabaseUrlUsuarios, supabaseAnonKeyUsuarios, {
  auth: {
    storageKey: 'supabase.auth.usuarios' // chave exclusiva para armazenamento local
  }
});
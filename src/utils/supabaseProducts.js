import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_PRODUCTS
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY_PRODUCTS

export const supabaseProducts = createClient(supabaseUrl, supabaseAnonKey)

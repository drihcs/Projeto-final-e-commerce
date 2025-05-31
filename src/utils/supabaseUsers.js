import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_USERS
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY_USERS

export const supabaseUsuarios = createClient(supabaseUrl, supabaseAnonKey)

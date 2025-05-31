import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

<<<<<<< HEAD
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
=======
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
>>>>>>> 325bc26fff4ffa20cedfded5dff2fdc98ef8c555

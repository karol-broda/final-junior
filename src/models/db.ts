import {createClient} from '@supabase/supabase-js'
import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from "postgres";

const supabaseUrl = new String(process.env.SUPABASE_URL)
const supabaseAnonKey = new String(process.env.SUPABASE_ANON_KEY)
const supabasePass = process.env.SUPABASE_PASS
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const client = postgres(`postgresql://postgres:${supabasePass}@db.wqrqsxtnhjbvgwxxppjk.supabase.co:5432/postgres`)
const db = drizzle(client)

export default db
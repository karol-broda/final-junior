import {createClient} from '@supabase/supabase-js'
import {drizzle} from 'drizzle-orm/postgres-js'

const supabaseUrl: string = process.env.SUPABASE_URL
const supabaseAnonKey: string = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const client = supabase
const db = drizzle(client)

export default db
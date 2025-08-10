import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eyrrvxywdyqhwjimrbkk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5cnJ2eHl3ZHlxaHdqaW1yYmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzE5MDMsImV4cCI6MjA2OTY0NzkwM30.4snXptMTeli-Qusk6sbZBjdXR97rb2qru8VPiCxNkQ4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 

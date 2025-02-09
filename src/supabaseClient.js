import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dicdnvswymiaugijpjfa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpY2RudnN3eW1pYXVnaWpwamZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMzYzNDAsImV4cCI6MjA1NDYxMjM0MH0.piFtbs8TCzvYAl-5htYNcl-fdAYkoqJEeIaUDz_iCI4';  // Replace this with your actual key from Supabase dashboard

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dhdojltitssvpstgfjuz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoZG9qbHRpdHNzdnBzdGdmanV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMjY1MjcsImV4cCI6MjA1MjgwMjUyN30.Y635ifmGF1B2ScpEZ97-plCM13OefPOmRvIVIQKQrQs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
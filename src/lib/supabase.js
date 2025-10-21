import { supabase } from "../lib/supabase";
import { createClient } from "@supabase/supabase-js";
const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(url, anon);
# (a) move OrderModal.jsx to components/
mkdir -p src/components
git mv src/OrderModal.jsx src/components/OrderModal.jsx

# (b) remove duplicate api.js (we’ll keep src/lib/api.js only)
git rm src/api.js

# (c) fix typo: superbase.js -> supabase.js
git mv src/superbase.js src/lib/supabase.js

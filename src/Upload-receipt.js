// api/upload-receipt.js
import { createClient } from "@supabase/supabase-js";
export const config = { api: { bodyParser: false } };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    const chunks = []; for await (const c of req) chunks.push(c);
    const buffer = Buffer.concat(chunks);
    const filename = `receipt_${Date.now()}.jpg`;
    const { data, error } = await supabase.storage
      .from("receipts").upload(filename, buffer, {
        contentType: "image/jpeg", upsert: false
      });
    if (error) throw error;
    res.json({ path: data.path }); // store path in orders.screenshot_url
  } catch (e) { console.error(e); res.status(500).json({ error: "upload" }); }
}

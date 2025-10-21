// api/auth/telegram.js
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const BOT_TOKEN = process.env.BOT_TOKEN;

function verifyInitData(initData) {
  const urlParams = new URLSearchParams(initData);
  const hash = urlParams.get("hash");
  urlParams.delete("hash");
  const dataCheckString = [...urlParams.entries()]
    .map(([k,v]) => `${k}=${v}`).sort().join("\n");
  const secret = crypto.createHash("sha256").update(BOT_TOKEN).digest();
  const hmac = crypto.createHmac("sha256", secret).update(dataCheckString).digest("hex");
  if (hmac !== hash) return null;
  return Object.fromEntries(urlParams);
}

export default async function handler(req, res) {
  try {
    const { initData } = req.body || {};
    const parsed = verifyInitData(initData);
    if (!parsed) return res.status(401).json({ error: "bad auth" });
    const user = JSON.parse(parsed.user); // {id, username, first_name, photo_url?...}
    await supabase.from("users").upsert({
      telegram_id: user.id, username: user.username || null,
      first_name: user.first_name || null, photo_url: user.photo_url || null
    });
    res.json({ user: { telegram_id: user.id, username: user.username, first_name: user.first_name }});
  } catch (e) { console.error(e); res.status(500).json({ error: "server" }); }
}

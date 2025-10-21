// api/orders.js
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const BOT_TOKEN = process.env.BOT_TOKEN;

async function notifyAdmins(order) {
  const { data: admins } = await supabase.from("admin_users").select("telegram_id");
  const text = `🧾 New Order #${order.id}
• User: ${order.user_id}
• Item: ${order.product_name}
• Price: ${order.price} Ks
• Player ID: ${order.player_id}
• Pay: ${order.payment_method}
${order.screenshot_url ? "• Screenshot uploaded" : ""}`;
  for (const a of admins || []) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST", headers: { "Content-Type":"application/json" },
      body: JSON.stringify({
        chat_id: a.telegram_id, text,
        reply_markup: { inline_keyboard: [[
          { text: "✅ Confirm", callback_data: `confirm:${order.id}` },
          { text: "❌ Reject",  callback_data: `reject:${order.id}` }
        ]]}
      })
    });
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const b = req.body || {};
    const price = Number(b.price) || 0;
    const insert = {
      user_id: Number(b.user_id),
      product_name: b.product_name, price,
      player_id: b.player_id, payment_method: b.payment_method || null,
      screenshot_url: b.screenshot_url || null, status: "awaiting_review"
    };
    const { data, error } = await supabase.from("orders").insert(insert).select().single();
    if (error) throw error;
    await notifyAdmins(data);
    res.json({ id: data.id });
  } catch (e) { console.error(e); res.status(500).json({ error: "create" }); }
}

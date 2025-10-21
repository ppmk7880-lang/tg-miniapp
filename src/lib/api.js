import { supabase } from "./supabase";

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
const ADMIN_CHAT_ID = import.meta.env.VITE_ADMIN_CHAT_ID;

// Upload screenshot to Supabase Storage
export async function uploadReceipt(file) {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("receipts")
    .upload(fileName, file);
  if (error) throw error;

  const { data: urlData } = supabase.storage.from("receipts").getPublicUrl(fileName);
  return urlData.publicUrl;
}

// Save order to DB + Notify admin
export async function submitOrder({ playerId, item, price, receiptUrl }) {
  const { data, error } = await supabase.from("orders").insert([
    {
      player_id: playerId,
      item_name: item,
      price,
      receipt_url: receiptUrl,
      status: "pending",
    },
  ]);
  if (error) throw error;

  // Send Telegram message to admin
  const msg = `🧾 *New Order Received!*
👤 Player ID: ${playerId}
🎮 Item: ${item}
💰 Price: ${price}
📸 [View Screenshot](${receiptUrl})`;
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text: msg,
      parse_mode: "Markdown",
    }),
  });

  return data;
}

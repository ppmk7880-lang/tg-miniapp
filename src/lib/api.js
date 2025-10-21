export async function authWithTelegram(WebApp) {
  const initData = WebApp.initData || "";
  const res = await fetch("/api/auth/telegram", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData }),
  });
  if (!res.ok) throw new Error("Auth failed");
  return res.json(); // { user: { telegram_id, ... } }
}
// src/lib/api.js

// 📸 Screenshot Upload Helper
export async function uploadReceipt(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/upload-receipt", {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error("upload failed");

  return res.json(); // { path }
}
import { uploadReceipt } from "./lib/api";

// Example usage:
async function handleUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const result = await uploadReceipt(file);
  console.log("Uploaded file path:", result.path);
}
// src/lib/api.js
import WebApp from "@twa-dev/sdk";

export async function uploadReceipt(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload-receipt", { method: "POST", body: form });
  if (!res.ok) throw new Error("upload failed");
  return res.json(); // { path }
}

export async function submitOrder({ item, playerId, payMethod, file }) {
  WebApp.MainButton.showProgress?.();
  try {
    let screenshot_path = null;
    if (file) {
      const up = await uploadReceipt(file);
      screenshot_path = up.path;
    }
    const userId = WebApp?.initDataUnsafe?.user?.id;
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        product_name: item.name,
        price: parseInt(String(item.price).replace(/[^\d]/g, ""), 10),
        player_id: playerId,
        payment_method: payMethod,
        screenshot_url: screenshot_path,
      }),
    });
    const data = await res.json();
    if (data?.id) WebApp.showAlert(`Order #${data.id} စာရင်းသွင်းပြီး ✅`);
    else WebApp.showAlert("Order failed ❌");
  } catch (e) {
    console.error(e);
    WebApp.showAlert("Server Error");
  } finally {
    WebApp.MainButton.hideProgress?.();
  }
}
export async function authWithTelegram(WebApp) {
  const initData = WebApp.initData || "";
  const res = await fetch("/api/auth/telegram", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData }),
  });
  if (!res.ok) throw new Error("Auth failed");
  return res.json(); // { user: { telegram_id, ... } }
}

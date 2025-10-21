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

// src/lib/api.js
import WebApp from "@twa-dev/sdk";

// 📸 Screenshot Upload
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

// 🧾 Order Submit
export async function submitOrder({ item, playerId, payMethod, file }) {
  WebApp.MainButton.showProgress?.();

  try {
    let screenshot_path = null;

    if (file) {
      const up = await uploadReceipt(file);
      screenshot_path = up.path;
    }

    const userId = WebApp?.initDataUnsafe?.user?.id; // Telegram user ID

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

    if (data?.id) {
      WebApp.showAlert(`Order #${data.id} စာရင်းသွင်းပြီးပါပြီ ✅`);
    } else {
      WebApp.showAlert("Order failed ❌");
    }
  } catch (err) {
    console.error(err);
    WebApp.showAlert("Server error");
  } finally {
    WebApp.MainButton.hideProgress?.();
  }
}

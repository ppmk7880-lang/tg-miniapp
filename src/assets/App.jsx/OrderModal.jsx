// src/components/OrderModal.jsx
import React, { useState } from "react";
import { submitOrder } from "../lib/api";

export default function OrderModal({ item, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // ✅ သင့် backend format အတိုင်း ပြင်နိုင်
      await submitOrder({
        productId: item.id,
        productName: item.name,
        price: item.price,
      });
      alert("Order submitted ✅");
      onClose?.();
    } catch (e) {
      console.error(e);
      alert("Submit failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // backdrop ကို နှိပ်ရင် မပိတ်ချင်ရင် onClick မှာ stopPropagation လုပ်ထား
  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm text-black shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b">
          <h3 className="font-semibold text-lg">Confirm purchase</h3>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-contain rounded"
            />
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm opacity-70">{item.price}</div>
            </div>
          </div>
        </div>

        <div className="p-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded border border-gray-300"
          >
            မဝယ်ပါ
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2 rounded bg-black text-white disabled:opacity-60"
          >
            {loading ? "ရွှေ့တင်နေ..." : "ဝယ်မယ်"}
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { uploadReceipt, submitOrder } from "../lib/api";

export default function OrderModal({ item, onClose }) {
  const [playerId, setPlayerId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (!playerId || !file) {
      alert("Player ID နဲ့ Screenshot 2 ခုလုံးလိုအပ်ပါတယ်");
      return;
    }
    setLoading(true);
    try {
      const receiptUrl = await uploadReceipt(file);
      await submitOrder({
        playerId,
        item: item.name,
        price: item.price,
        receiptUrl,
      });
      alert("Order ပေးပြီးပါပြီ ✅");
      onClose();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-4 text-black w-80">
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <p className="mb-2">{item.price}</p>

        <input
          type="text"
          placeholder="သင့် Player ID"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="border rounded w-full p-2 mb-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border rounded w-full p-2 mb-2"
        />

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="bg-purple-600 text-white w-full py-2 rounded"
        >
          {loading ? "Processing..." : "Confirm Purchase"}
        </button>

        <button
          onClick={onClose}
          className="mt-2 text-sm text-gray-600 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

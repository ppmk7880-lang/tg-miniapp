// src/components/OrderModal.jsx
import React, { useState } from "react";
import { submitOrder } from "../lib/api";

export default function OrderModal({ item, onClose }) {
  const [playerId, setPlayerId] = useState("");
  const [payMethod, setPayMethod] = useState("KBZPay");
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    if (!playerId) return alert("Please enter your Player ID");
    await submitOrder({ item, playerId, payMethod, file });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center z-[9999]">
      <div className="bg-white text-black rounded-xl p-4 w-[90vw] max-w-md">
        <h3 className="text-lg font-semibold mb-3">
          {item.name} ဝယ်ချင်ပါသလား?
        </h3>

        <div className="text-sm mb-2 opacity-70">ဈေးနှုန်း: {item.price}</div>

        <label className="block text-sm font-medium mb-1">🎮 Player ID</label>
        <input
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Enter your player ID"
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <label className="block text-sm font-medium mb-1">💳 ငွေပေးချေမယ့်နည်း</label>
        <select
          value={payMethod}
          onChange={(e) => setPayMethod(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        >
          <option>KBZPay</option>
          <option>Wave</option>
          <option>AYA Pay</option>
        </select>

        <label className="block text-sm font-medium mb-1">📸 ငွေလွဲပြေစာ</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full mb-3"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
// src/components/OrderModal.jsx
import React, { useState } from "react";
import { submitOrder } from "../lib/api";    // ✅ ဖ忘မနေပါနဲ့

export default function OrderModal({ item, onClose }) {
  const [playerId, setPlayerId] = useState("");
  const [payMethod, setPayMethod] = useState("KBZPay");
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    if (!playerId) return alert("Please enter your Player ID");
    await submitOrder({ item, playerId, payMethod, file });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center z-[9999]">
      <div className="bg-white text-black rounded-xl p-4 w-[90vw] max-w-md">
        <h3 className="text-lg font-semibold mb-3">{item.name} ဝယ်မလား?</h3>

        <div className="text-sm mb-2 opacity-70">ဈေးနှုန်း: {item.price}</div>

        <label className="block text-sm mb-1">🎮 Player ID</label>
        <input
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Enter your player ID"
        />

        <label className="block text-sm mb-1">💳 Payment</label>
        <select
          value={payMethod}
          onChange={(e) => setPayMethod(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        >
          <option>KBZPay</option><option>Wave</option><option>AYA Pay</option>
        </select>

        <label className="block text-sm mb-1">📸 Screenshot</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full mb-3"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
}

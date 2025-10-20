import React, { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

// 👇 products ကို ဒီဖိုင်ထဲမှာပဲ ထည့်ထားတယ် (import မလိုအောင်)
const products = [
  { id: 1, name: "Weekly Pass",   price: "6000 ကျပ်",   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s" },
  { id: 2, name: "Twilight Pass", price: "32200 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s" },
  { id: 3, name: "50+50 အပိုရ",   price: "3500 ကျပ်",  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s" },
  { id: 4, name: "150+150 အပိုရ", price: "10300 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s" },
  { id: 5, name: "250+250 အပိုရ", price: "15600 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s" },
  { id: 6, name: "500+500 အပိုရ", price: "31100 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s" },
  { id: 7, name: "86", price: "4800 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 8, name: "172", price: "10200 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 9, name: "257", price: "15300 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 10, name: "343", price: "20500 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 11, name: "429", price: "25500 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 12, name: "514", price: "31200 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 13, name: "600", price: "35500 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 14, name: "706", price: "40500 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 15, name: "878", price: "50800 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 16, name: "1049", price: "60000 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 17, name: "1135", price: "66500 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",}, 
  { id: 18, name: "1412", price: "80000 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 19, name: "1669", price: "95500 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 20, name: "2195", price: "122500 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 21, name: "2538", price: "143000 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 22, name: "2901", price: "160000 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 23, name: "3688", price: "205000 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},   
  { id: 24, name: "4394", price: "245500 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 25, name: "5532", price: "312000 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 26, name: "6238", price: "352500 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",},
  { id: 27, name: "9288", price: "500000 ကျပ်", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX3Tzs4Dl9u84VMuUpoi1BpFtm8kkKsgYyA&s",}, 
];

export default function App() {
  useEffect(() => { WebApp.ready(); WebApp.expand(); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white p-4">
      {/* Header */}g
      <header className="flex justify-between items-center mb-4">
        <div className="font-bold text-lg">0 ကျပ် +</div>
      </header>

      {/* Info Card */}
      <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-1">Hello Buddy 👋</h2>
        <p className="opacity-90">CasaNova Game Store </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <a className="bg-blue-500 rounded-md px-3 py-2 text-center" href="tel:09956010434">@casanova_097</a>
          <button className="bg-sky-400 rounded-md px-3 py-2">Channel</button>
          <button className="bg-indigo-500 rounded-md px-3 py-2">Account</button>
        </div>
      </div>

      {/* Product Grid */}

      <h3 className="font-semibold text-xl mb-3">TOPUP</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white text-black rounded-lg p-3 shadow flex flex-col items-center hover:scale-105 transition-transform"
          >
            <img src={item.image} alt={item.name} className="rounded-md mb-2 w-20 h-20 object-contain" />
            <h4 className="text-sm font-semibold text-center">{item.name}</h4>
            <p className="text-xs opacity-70 mb-2">{item.price}</p>
            <button
  onClick={() => buy(item)}
  className="bg-black text-white w-full py-1 rounded active:scale-95"
>
  Buy Now
</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-xs mt-6 opacity-80">
        Privacy Policy | Terms & Conditions
      </p>
    </div>
  );
}
// handler
function buy(item) {
  WebApp.showPopup({
    title: "Confirm purchase",
    message: `${item.name}\nဈေးနှုန်း: ${item.price}\nဝယ်ချင်တာမှန်ပါသလား?`,
    buttons: [
      { id: "cancel", type: "cancel", text: "မဝယ်ပါ" },
      { id: "ok", type: "ok", text: "ဝယ်မယ်" },
    ],
  }, (btnId) => {
    if (btnId === "ok") {
      // ဒီနေရာကနေ order data ကို bot/server လို့ပို့နိုင်တယ်
      // WebApp.sendData(JSON.stringify({ type: "order", item }));
      WebApp.HapticFeedback?.notificationOccurred("success");
      WebApp.showAlert("Thanks! Order received.");
    }
  });
}

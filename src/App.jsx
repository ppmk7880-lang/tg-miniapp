import { useEffect, useMemo, useState } from "react";
import WebApp from "@twa-dev/sdk"; // ✅ ဒီလို import မရှိရင်အလုပ်မလုပ်ပါ

function getUserSafe() {
  return (
    WebApp.initDataUnsafe?.user ?? {
      id: 0,
      first_name: "Guest",
      username: "dev_preview",
      language_code: "en",
    }
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const user = useMemo(getUserSafe, []);

  useEffect(() => {
    // Telegram WebApp ကို initialize
    WebApp.ready();
    WebApp.expand();

    // Theme color ကိုအလိုအလျောက်ပြောင်း
    const setTheme = () => {
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", WebApp.themeParams?.bg_color || "#0e1621");
    };
    setTheme();
    WebApp.onEvent("themeChanged", setTheme);

    // ✅ Main Button Setup
    WebApp.MainButton.setText("Confirm");
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(() => {
      try {
        WebApp.HapticFeedback?.impactOccurred("medium");
      } catch {}
      WebApp.showPopup({
        title: "Done",
        message: "Thanks! Closing the app…",
        buttons: [{ type: "ok" }],
      });
      setTimeout(() => WebApp.close(), 400);
    });

    // ✅ Back Button Setup
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => WebApp.close());

    setReady(true);

    // cleanup
    return () => {
      WebApp.offEvent("themeChanged", setTheme);
      WebApp.MainButton.offClick();
      WebApp.BackButton.hide();
    };
  }, []);

  // Theme color variables
  const bg =
    WebApp.themeParams?.bg_color ||
    (WebApp.colorScheme === "dark" ? "#0e1621" : "#ffffff");
  const text =
    WebApp.themeParams?.text_color ||
    (WebApp.colorScheme === "dark" ? "#fff" : "#000");
  const card =
    WebApp.themeParams?.secondary_bg_color ||
    (WebApp.colorScheme === "dark" ? "#17212b" : "#f5f5f7");
  const section =
    WebApp.themeParams?.section_bg_color ||
    (WebApp.colorScheme === "dark" ? "#0f1822" : "#fff");

  // ✅ UI Layout
  return (
    <div
      style={{
        minHeight: "100dvh",
        padding: 16,
        display: "grid",
        placeItems: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial",
        color: text,
        background: bg,
        transition: "background 150ms ease",
      }}
    >
      <div
        style={{
          width: "min(680px, 92vw)",
          borderRadius: 16,
          padding: 20,
          boxShadow:
            WebApp.colorScheme === "dark"
              ? "0 8px 30px rgba(0,0,0,.45)"
              : "0 8px 30px rgba(0,0,0,.1)",
          background: card,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22, lineHeight: 1.25 }}>
          Hello {user?.first_name} 👋
        </h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          This is a React Telegram Mini App starter.
        </p>

        <div
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 12,
            background: section,
            border:
              WebApp.colorScheme === "dark"
                ? "1px solid rgba(255,255,255,.08)"
                : "1px solid rgba(0,0,0,.06)",
          }}
        >
          <b>User preview</b>
          <pre
            style={{
              marginTop: 8,
              overflow: "auto",
              whiteSpace: "pre-wrap",
              fontSize: 12,
              opacity: 0.9,
            }}
          >
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <div style={{ marginTop: 18, fontSize: 13, opacity: 0.8 }}>
          {ready ? "UI ready ✅" : "Initializing…"}
        </div>

        <button
          onClick={() => {
            try {
              WebApp.HapticFeedback?.notificationOccurred("success");
            } catch {}
            WebApp.showAlert("Custom action clicked!");
          }}
          style={{
            marginTop: 16,
            padding: "10px 14px",
            borderRadius: 10,
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Custom Button
        </button>
      </div>
    </div>
  );
}

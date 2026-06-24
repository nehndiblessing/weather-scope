import { useState } from "react";

export default function ScreenshotButton({ selector = "main", filename = "screenshot.png" }) {
  const [busy, setBusy] = useState(false);

  async function capture() {
    if (busy) return;
    setBusy(true);

    try {
      const { default: html2canvas } = await import("html2canvas");
      const el = document.querySelector(selector) || document.body;

      const canvas = await html2canvas(el, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("Screenshot failed", e);
      alert("Screenshot failed. Some content (like map tiles) may not be capturable. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={capture}
      disabled={busy}
      aria-label="Take screenshot"
      className="bg-gray-800 dark:bg-slate-700 hover:opacity-90 disabled:opacity-50 text-white px-3 py-2 rounded-lg text-sm transition-opacity"
    >
      {busy ? "Capturing..." : "📸 Screenshot"}
    </button>
  );
}

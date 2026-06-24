import { useState } from "react";

export default function ExportPDF({ weather, city }) {
  const [busy, setBusy] = useState(false);

  async function handleExport() {
    if (busy) return;
    setBusy(true);

    try {
      const { default: html2canvas } = await import("html2canvas");
      const el = document.querySelector(".max-w-5xl");
      if (!el) throw new Error("Content area not found");

      const canvas = await html2canvas(el, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const safeName = city
        ? city.replace(/[^a-z0-9]/gi, "_").toLowerCase()
        : "weather_report";

      const link = document.createElement("a");
      link.download = `${safeName}.png`;
      link.href = imgData;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
      alert("Could not export. Try using the Screenshot button instead.");
    } finally {
      setBusy(false);
    }
  }

  if (!weather) return null;

  return (
    <button
      onClick={handleExport}
      disabled={busy}
      aria-label="Export weather report"
      className="bg-gray-800 dark:bg-slate-700 hover:opacity-90 disabled:opacity-50 text-white px-3 py-2 rounded-lg text-sm transition-opacity"
    >
      {busy ? "Exporting..." : "Export PNG"}
    </button>
  );
}

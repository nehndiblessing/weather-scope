export default function ScreenshotButton({ selector = "main", filename = "screenshot.png" }) {
  async function capture() {
    try {
      const el = document.querySelector(selector) || document.body;
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(el, { useCORS: true, scale: 1 });
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      });
    } catch (e) {
      console.error("Screenshot failed", e);
    }
  }

  return (
    <button
      onClick={capture}
      aria-label="Take screenshot"
      className="bg-gray-800 dark:bg-slate-700 hover:opacity-90 text-white px-3 py-2 rounded-lg text-sm transition-opacity"
    >
      📸 Screenshot
    </button>
  );
}

import { useEffect, useState } from "react";

export default function PwaUpdatePrompt() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const mod = await import("virtual:pwa-register");
        if (mod?.registerSW) {
          const reg = mod.registerSW({
            onNeedRefresh() {
              setNeedRefresh(true);
            },
            onOfflineReady() {
              console.log("App ready for offline use");
            },
          });
          setRegistration(reg);
        }
      } catch {
        // virtual module unavailable (dev mode)
      }
    })();
  }, []);

  if (!needRefresh) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-slate-800 shadow-xl rounded-2xl px-5 py-4 flex items-center gap-4 border border-gray-200 dark:border-slate-700"
      role="alert"
    >
      <p className="text-sm dark:text-white">A new version is available.</p>
      <button
        onClick={() => {
          registration?.();
          setNeedRefresh(false);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
      >
        Update
      </button>
      <button
        onClick={() => setNeedRefresh(false)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl leading-none"
        aria-label="Dismiss"
      >
        &times;
      </button>
    </div>
  );
}

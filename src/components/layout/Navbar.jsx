import ThemeToggle from "../ui/ThemeToggle";
import { useState } from "react";
import { useUI } from "../../context/UIContext";
import ScreenshotButton from "../ui/ScreenshotButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { setMobileOpen } = useUI();

  return (
    <header className="bg-white dark:bg-slate-900 shadow px-4 sm:px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          className="sm:hidden p-2 rounded-md"
          onClick={() => {
            setOpen((v) => !v);
            setMobileOpen((v) => !v);
          }}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>

        <h1 className="text-xl sm:text-2xl font-bold truncate">
          WeatherScope
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <ScreenshotButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
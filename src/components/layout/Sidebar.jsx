import { NavLink } from "react-router-dom";
import { useUI } from "../../context/UIContext";

export default function Sidebar() {
  const { mobileOpen, setMobileOpen } = useUI();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden sm:block w-64 bg-white dark:bg-slate-900 p-5 rounded-3xl h-fit">
        <nav className="flex flex-col gap-1">
          <NavLink to="/" className={({ isActive }) => `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"}`}>
            Dashboard
          </NavLink>
          <NavLink to="/compare" className={({ isActive }) => `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"}`}>
            Compare Cities
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"}`}>
            Favorites
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"}`}>
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 sm:hidden transition-opacity ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />

        <aside className={`absolute left-0 top-0 h-full w-72 bg-white dark:bg-slate-900 p-6 shadow-lg transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
          </div>

          <nav className="flex flex-col gap-1">
            <NavLink to="/" onClick={() => setMobileOpen(false)} className={({ isActive }) => `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"}`}>
              Dashboard
            </NavLink>
            <NavLink to="/compare" onClick={() => setMobileOpen(false)} className={({ isActive }) => `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"}`}>
              Compare Cities
            </NavLink>
            <NavLink to="/favorites" onClick={() => setMobileOpen(false)} className={({ isActive }) => `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"}`}>
              Favorites
            </NavLink>
            <NavLink to="/settings" onClick={() => setMobileOpen(false)} className={({ isActive }) => `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"}`}>
              Settings
            </NavLink>
          </nav>
        </aside>
      </div>
    </>
  );
}
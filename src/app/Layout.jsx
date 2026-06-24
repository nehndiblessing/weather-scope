import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
      <Navbar />

      <div className="flex gap-6 px-4 py-6 max-w-7xl mx-auto">
        <Sidebar />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

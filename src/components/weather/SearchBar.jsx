import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
      <label htmlFor="city-search" className="sr-only">Search city</label>
      <input
        id="city-search"
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 text-sm sm:text-base bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
      />

      <button
        type="submit"
        className="bg-black dark:bg-blue-600 text-white px-5 py-3 rounded-xl w-full sm:w-auto hover:opacity-90 transition-opacity"
      >
        Search
      </button>
    </form>
  );
}
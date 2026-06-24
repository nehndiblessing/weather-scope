import { useState } from "react";

// Favorites are stored as objects: { name, country?, latitude?, longitude? }
// Backwards-compatible with older string format.
export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");

    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);

      return parsed.map((item) => {
        if (typeof item === "string") return { name: item };
        return item;
      });
    } catch (err) {
      console.warn(err);
      return [];
    }
  });

  function save(updated) {
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  function addFavorite(city) {
    // city may be string or object
    const norm = typeof city === "string" ? { name: city } : city;

    if (favorites.some((f) => f.name === norm.name)) return;

    const updated = [...favorites, norm];
    save(updated);
  }

  function removeFavorite(city) {
    const name = typeof city === "string" ? city : city.name;

    const updated = favorites.filter((c) => c.name !== name);
    save(updated);
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
}
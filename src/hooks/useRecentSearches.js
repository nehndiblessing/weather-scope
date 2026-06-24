import { useState } from "react";

export default function useRecentSearches() {
  const [recent, setRecent] =
    useState(() => {
      const stored =
        localStorage.getItem(
          "recentSearches"
        );

      return stored
        ? JSON.parse(stored)
        : [];
    });

  function addSearch(city) {
    const updated = [
      city,
      ...recent.filter(
        (c) => c !== city
      ),
    ].slice(0, 5);

    setRecent(updated);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );
  }

  return {
    recent,
    addSearch,
  };
}
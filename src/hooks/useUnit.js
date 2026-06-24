import { useState, useCallback } from "react";

export default function useUnit() {
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem("unit") || "celsius";
  });

  const toggleUnit = useCallback(() => {
    setUnit((prev) => {
      const next = prev === "celsius" ? "fahrenheit" : "celsius";
      localStorage.setItem("unit", next);
      return next;
    });
  }, []);

  function convertTemp(celsius) {
    if (celsius == null) return "—";
    if (unit === "fahrenheit") {
      return `${Math.round(celsius * 9 / 5 + 32)}°F`;
    }
    return `${Math.round(celsius)}°C`;
  }

  return { unit, toggleUnit, convertTemp };
}

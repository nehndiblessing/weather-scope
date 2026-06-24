export function getAQIStatus(aqi) {
  if (aqi <= 50)
    return {
      label: "Good",
      color: "#22c55e",
      bg: "#dcfce7",
    };

  if (aqi <= 100)
    return {
      label: "Moderate",
      color: "#eab308",
      bg: "#fef9c3",
    };

  if (aqi <= 150)
    return {
      label: "Unhealthy for Sensitive Groups",
      color: "#f97316",
      bg: "#ffedd5",
    };

  if (aqi <= 200)
    return {
      label: "Unhealthy",
      color: "#ef4444",
      bg: "#fee2e2",
    };

  if (aqi <= 300)
    return {
      label: "Very Unhealthy",
      color: "#a855f7",
      bg: "#f3e8ff",
    };

  return {
    label: "Hazardous",
    color: "#7c3aed",
    bg: "#f5f3ff",
  };
}
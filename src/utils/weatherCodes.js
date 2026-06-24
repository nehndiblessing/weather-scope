export const weatherCodes = {
  0: {
    label: "Clear Sky",
    icon: "☀️",
  },
  1: {
    label: "Mainly Clear",
    icon: "🌤️",
  },
  2: {
    label: "Partly Cloudy",
    icon: "⛅",
  },
  3: {
    label: "Overcast",
    icon: "☁️",
  },
  45: {
    label: "Fog",
    icon: "🌫️",
  },
  48: {
    label: "Fog",
    icon: "🌫️",
  },
  51: {
    label: "Light Drizzle",
    icon: "🌦️",
  },
  61: {
    label: "Rain",
    icon: "🌧️",
  },
  63: {
    label: "Moderate Rain",
    icon: "🌧️",
  },
  65: {
    label: "Heavy Rain",
    icon: "⛈️",
  },
  71: {
    label: "Snow",
    icon: "❄️",
  },
  95: {
    label: "Thunderstorm",
    icon: "⚡",
  },
};

export function getWeatherInfo(code) {
  return (
    weatherCodes[code] || {
      label: "Unknown",
      icon: "❔",
    }
  );
}
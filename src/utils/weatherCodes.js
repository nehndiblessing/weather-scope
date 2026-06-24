export const weatherCodes = {
  0: { label: "Clear Sky" },
  1: { label: "Mainly Clear" },
  2: { label: "Partly Cloudy" },
  3: { label: "Overcast" },
  45: { label: "Fog" },
  48: { label: "Fog" },
  51: { label: "Light Drizzle" },
  61: { label: "Rain" },
  63: { label: "Moderate Rain" },
  65: { label: "Heavy Rain" },
  71: { label: "Snow" },
  95: { label: "Thunderstorm" },
};

export function getWeatherInfo(code) {
  return weatherCodes[code] || { label: "Unknown" };
}
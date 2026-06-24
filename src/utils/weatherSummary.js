export function generateWeatherSummary(weather) {
  if (!weather?.current) return "";

  const c = weather.current;
  const parts = [];

  parts.push(`The current temperature is ${Math.round(c.temperature_2m)}°C`);

  if (c.apparent_temperature != null) {
    const diff = c.apparent_temperature - c.temperature_2m;
    if (Math.abs(diff) > 3) {
      parts.push(`feels like ${Math.round(c.apparent_temperature)}°C`);
    }
  }

  if (c.weather_code != null) {
    const labels = {
      0: "with clear skies",
      1: "with mainly clear skies",
      2: "with partly cloudy conditions",
      3: "with overcast conditions",
      45: "with fog",
      48: "with fog",
      51: "with light drizzle",
      61: "with rain",
      63: "with moderate rain",
      65: "with heavy rain",
      71: "with snow",
      95: "with thunderstorms",
    };
    parts.push(labels[c.weather_code] || "");
  }

  if (c.relative_humidity_2m != null) {
    parts.push(`Humidity is at ${c.relative_humidity_2m}%`);
  }

  if (c.wind_speed_10m != null) {
    const speed = c.wind_speed_10m;
    if (speed < 10) parts.push("with light winds");
    else if (speed < 30) parts.push("with moderate winds");
    else if (speed < 50) parts.push("with strong winds");
    else parts.push("with very strong winds");
  }

  if (c.uv_index != null) {
    const uv = c.uv_index;
    if (uv >= 8) parts.push("UV exposure is very high — sunscreen recommended");
    else if (uv >= 6) parts.push("UV exposure is high");
    else if (uv >= 3) parts.push("moderate UV levels");
  }

  const summary = parts.filter(Boolean).join(". ");
  return summary.charAt(0).toUpperCase() + summary.slice(1) + ".";
}

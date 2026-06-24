export function generateAlerts(
  weather
) {
  const alerts = [];

  const current =
    weather.current;

  if (
    current.temperature_2m > 40
  ) {
    alerts.push({
      type: "heat",
      message:
        "Extreme heat conditions",
    });
  }

  if (
    current.wind_speed_10m >
    50
  ) {
    alerts.push({
      type: "wind",
      message:
        "Strong wind warning",
    });
  }

  if (
    current.uv_index >= 8
  ) {
    alerts.push({
      type: "uv",
      message:
        "Very high UV exposure",
    });
  }

  return alerts;
}
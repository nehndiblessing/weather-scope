import { generateAlerts } from "../../utils/weatherAlerts";

export default function WeatherAlerts({ weather }) {
  if (!weather) return null;

  const alerts = generateAlerts(weather);

  if (!alerts.length) return null;

  return (
    <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5">
      <h3 className="font-bold mb-3 text-orange-800 dark:text-orange-200">Weather Alerts</h3>

      {alerts.map((alert) => (
        <div key={alert.message} className="mb-2 text-orange-700 dark:text-orange-300">
          ⚠️ {alert.message}
        </div>
      ))}
    </div>
  );
}
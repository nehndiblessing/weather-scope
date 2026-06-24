import { getAQIStatus } from "../../utils/aqi";

export default function AQICard({ airQuality }) {
  if (!airQuality) return null;

  const current = airQuality.current;
  const status = getAQIStatus(current.us_aqi);

  return (
    <div
      className="rounded-3xl shadow-lg p-6 mt-6 transition-colors"
      style={{
        backgroundColor: status.bg,
        borderLeft: `6px solid ${status.color}`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Air Quality</h3>
        <span
          className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: status.color, color: "#fff" }}
        >
          {status.emoji} {status.label}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/70 dark:bg-slate-800/70 rounded-xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">AQI</p>
          <p className="text-3xl font-bold" style={{ color: status.color }}>{current.us_aqi}</p>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 rounded-xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">PM2.5</p>
          <p className="text-xl font-semibold dark:text-white">{current.pm2_5?.toFixed(1)}</p>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 rounded-xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">PM10</p>
          <p className="text-xl font-semibold dark:text-white">{current.pm10?.toFixed(1)}</p>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 rounded-xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Ozone</p>
          <p className="text-xl font-semibold dark:text-white">{current.ozone?.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}
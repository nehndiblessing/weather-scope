export default function DailyForecast({ data, convertTemp }) {
  if (!data?.time) return null;

  const daily = data;
  const toTemp = convertTemp || ((v) => `${Math.round(v)}°`);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-6 mt-6 transition-colors">
      <h3 className="text-lg sm:text-xl font-bold mb-4">7-Day Forecast</h3>

      <div className="space-y-3">
        {daily.time.map((date, index) => (
          <div key={date} className="flex justify-between items-center py-1">
            <span className="text-sm sm:text-base font-medium dark:text-gray-200">
              {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
            </span>
            <span className="text-sm sm:text-base dark:text-white">
              <span className="text-red-500 dark:text-red-400">{toTemp(daily.temperature_2m_max[index])}</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-blue-500 dark:text-blue-400">{toTemp(daily.temperature_2m_min[index])}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function HourlyForecast({ data, convertTemp }) {
  if (!data?.time) return null;

  const hours = data.time.slice(0, 24);
  const temps = data.temperature_2m.slice(0, 24);
  const toTemp = convertTemp || ((v) => `${Math.round(v)}°C`);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-6 mt-6 transition-colors">
      <h3 className="text-lg sm:text-xl font-bold mb-4">Next 24 Hours</h3>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {hours.map((hour, index) => (
          <div key={hour} className="min-w-20 text-center flex-shrink-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(hour).getHours()}:00
            </p>
            <p className="font-bold text-lg dark:text-white">{toTemp(temps[index])}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
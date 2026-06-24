export default function Highlights({ weather }) {
  if (!weather?.daily) return null;

  const current = weather.current;
  const sunrise = weather.daily.sunrise?.[0];
  const sunset = weather.daily.sunset?.[0];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      <Card title="UV Index" value={current?.uv_index} />
      <Card title="Sunrise" value={sunrise ? new Date(sunrise).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"} />
      <Card title="Sunset" value={sunset ? new Date(sunset).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-5 transition-colors">
      <h4 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{title}</h4>
      <p className="text-xl sm:text-2xl font-bold mt-2 dark:text-white">{value}</p>
    </div>
  );
}
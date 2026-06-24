import { useEffect, useState } from "react";

export default function ForecastChart({ weather }) {
  const [R, setR] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (typeof window !== "undefined" && window.Recharts) {
        if (!cancelled) setR(window.Recharts);
        return;
      }
      try {
        const mod = await import("recharts");
        if (!cancelled) setR(mod);
      } catch (err) {
        console.error("Failed to load recharts", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!weather?.daily) return null;
  if (!R) return <div className="bg-white rounded-3xl shadow-lg p-6">Loading chart...</div>;

  const { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Legend } = R;

  const data = weather.daily.time.map((date, index) => ({
    day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    max: weather.daily.temperature_2m_max[index],
    min: weather.daily.temperature_2m_min[index],
  }));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-6 transition-colors">
      <h3 className="font-bold mb-4 dark:text-white">7-Day Forecast</h3>

      <div className="h-72">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <Tooltip />
            <Legend />

            <Bar dataKey="max" fill="#ef4444" name="Max" radius={[4, 4, 0, 0]} />
            <Bar dataKey="min" fill="#3b82f6" name="Min" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

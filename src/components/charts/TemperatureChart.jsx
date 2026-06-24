import { useEffect, useState } from "react";

export default function TemperatureChart({ weather }) {
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

  if (!weather) return null;
  if (!R) return <div className="bg-white rounded-3xl shadow-lg p-6">Loading chart...</div>;

  const { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } = R;

  const data = weather.hourly.time.slice(0, 24).map((time, index) => ({
    hour: new Date(time).getHours(),
    temp: weather.hourly.temperature_2m[index],
  }));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-6 transition-colors">
      <h3 className="font-bold mb-4 dark:text-white">Temperature Trend</h3>

      <div className="h-72">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="hour" />
            <Tooltip />

            <Line type="monotone" dataKey="temp" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
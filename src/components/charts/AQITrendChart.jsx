import { useEffect, useState } from "react";

export default function AQITrendChart({ airQuality }) {
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

  if (!airQuality?.hourly) return null;
  if (!R) return <div className="bg-white rounded-3xl shadow-lg p-6">Loading chart...</div>;

  const { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, ReferenceLine } = R;

  const data = airQuality.hourly.time.slice(0, 24).map((time, index) => ({
    hour: new Date(time).getHours(),
    aqi: airQuality.hourly.us_aqi[index],
  }));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-6 transition-colors">
      <h3 className="font-bold mb-4 dark:text-white">AQI Trend</h3>

      <div className="h-72">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="hour" />
            <Tooltip />

            <ReferenceLine y={50} stroke="#22c55e" strokeDasharray="4 4" label="Good" />
            <ReferenceLine y={100} stroke="#eab308" strokeDasharray="4 4" label="Moderate" />
            <ReferenceLine y={150} stroke="#f97316" strokeDasharray="4 4" label="Unhealthy" />

            <Line type="monotone" dataKey="aqi" stroke="#8b5cf6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

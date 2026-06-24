import React, { useState, Suspense } from "react";
import { FaCity } from "react-icons/fa";
import { searchCity } from "../api/geocodeApi";
import { getWeather } from "../api/weatherApi";
import FadeIn from "../components/ui/FadeIn";
import useUnit from "../hooks/useUnit";

const TemperatureChart = React.lazy(() => import("../components/charts/TemperatureChart"));
const HumidityChart = React.lazy(() => import("../components/charts/HumidityChart"));

export default function Compare() {
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { convertTemp } = useUnit();

  async function addCity() {
    if (!input.trim()) return;

    setLoading(true);
    setError("");

    try {
      const results = await searchCity(input);

      if (!results.length) {
        setError("City not found");
        return;
      }

      const city = results[0];

      if (cities.some((c) => c.name === city.name)) {
        setError("City already added");
        return;
      }

      const weather = await getWeather(city.latitude, city.longitude);

      setCities((prev) => [
        ...prev,
        { name: city.name, country: city.country, weather },
      ]);

      setInput("");
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  }

  function removeCity(name) {
    setCities((s) => s.filter((c) => c.name !== name));
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold dark:text-white">Compare Cities</h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="compare-city" className="sr-only">Add city to compare</label>
        <input
          id="compare-city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCity()}
          placeholder="Add city"
          className="border dark:border-slate-600 p-3 rounded-xl flex-1 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
        />

        <button
          onClick={addCity}
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
        >
          {loading ? "Loading..." : "Add"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-xl px-4 py-3" role="alert">
          {error}
        </p>
      )}

      {!cities.length && !error && (
        <FadeIn>
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 sm:p-12 text-center transition-colors">
            <FaCity className="text-5xl mb-4 mx-auto text-gray-400" />
            <h3 className="text-xl font-bold mb-2 dark:text-white">No cities yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Add cities above to compare their weather side by side.</p>
          </div>
        </FadeIn>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cities.map((city) => (
          <FadeIn key={city.name}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg dark:text-white">{city.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{city.country}</p>
                </div>
                <button
                  onClick={() => removeCity(city.name)}
                  aria-label={`Remove ${city.name}`}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="mt-4">
                <p className="text-2xl font-semibold dark:text-white">
                  {convertTemp(city.weather.current?.temperature_2m)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Humidity: {city.weather.current?.relative_humidity_2m}% | Wind: {city.weather.current?.wind_speed_10m} km/h
                </p>
              </div>

              <Suspense fallback={<div className="mt-4">Loading charts...</div>}>
                <div className="grid gap-4 mt-4">
                  <TemperatureChart weather={city.weather} />
                  <HumidityChart weather={city.weather} />
                </div>
              </Suspense>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
import { FaStar, FaRegStar } from "react-icons/fa";
import { getWeatherInfo } from "../../utils/weatherCodes";
import WeatherIcon from "../../utils/WeatherIcon";

export default function WeatherCard({ city, weather, convertTemp, isFavorite, onToggleFavorite }) {
  if (!weather) return null;

  const current = weather.current;
  const info = getWeatherInfo(current.weather_code);
  const toTemp = convertTemp || ((v) => `${Math.round(v)}°C`);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-6 sm:p-8 mt-6 transition-colors">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold truncate">{city}</h2>
        {onToggleFavorite && (
          <button
            onClick={onToggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              isFavorite
                ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800"
                : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900 hover:text-yellow-600"
            }`}
          >
            {isFavorite ? <FaStar /> : <FaRegStar />}
            <span>{isFavorite ? "Saved" : "Save"}</span>
          </button>
        )}
      </div>

      <div className="mt-4">
        <WeatherIcon code={current.weather_code} />
        <p className="text-base sm:text-lg mt-2">{info.label}</p>
        <p className="text-3xl sm:text-5xl font-bold mt-3">{toTemp(current.temperature_2m)}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Stat title="Feels Like" value={toTemp(current.apparent_temperature)} />
        <Stat title="Humidity" value={`${current.relative_humidity_2m}%`} />
        <Stat title="Wind" value={`${current.wind_speed_10m} km/h`} />
        <Stat title="Pressure" value={`${current.surface_pressure} hPa`} />
        <Stat title="Visibility" value={`${(current.visibility / 1000).toFixed(1)} km`} />
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-gray-100 dark:bg-slate-700 rounded-xl p-4 transition-colors">
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="font-semibold dark:text-white">{value}</p>
    </div>
  );
}
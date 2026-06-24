import React, { Suspense, useState, useEffect } from "react";
import { FaCloudSun } from "react-icons/fa";
import SearchBar from "../components/weather/SearchBar";
import WeatherCard from "../components/weather/WeatherCard";

import { searchCity, reverseGeocode } from "../api/geocodeApi";
import { getWeather } from "../api/weatherApi";
import LocationButton from "../components/weather/LocationButton";
import { getCurrentPosition } from "../hooks/useLocation";

import HourlyForecast from "../components/weather/HourlyForecast";
import DailyForecast from "../components/weather/DailyForecast";

import { getAirQuality } from "../api/airQualityApi";
import AQICard from "../components/weather/AQICard";
import Highlights from "../components/weather/Highlights";
import WeatherAlerts from "../components/weather/WeatherAlerts";
import useRecentSearches from "../hooks/useRecentSearches";
import useFavorites from "../hooks/useFavourite";
import RecentSearches from "../components/weather/RecentSearches";
import SEO from "../components/ui/SEO";
import WeatherSkeleton from "../components/ui/WeatherSkeleton";
import FadeIn from "../components/ui/FadeIn";
import useOffline from "../hooks/useOffline";
import useUnit from "../hooks/useUnit";
import { generateWeatherSummary } from "../utils/weatherSummary";
const ExportPDF = React.lazy(() => import("../components/ui/ExportPDF"));
const TemperatureChart = React.lazy(() => import("../components/charts/TemperatureChart"));
const HumidityChart = React.lazy(() => import("../components/charts/HumidityChart"));
const WindSpeedChart = React.lazy(() => import("../components/charts/WindSpeedChart"));
const AQITrendChart = React.lazy(() => import("../components/charts/AQITrendChart"));
const ForecastChart = React.lazy(() => import("../components/charts/ForecastChart"));
const WeatherMap = React.lazy(() => import("../components/weather/WeatherMap"));

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [airQuality, setAirQuality] = useState(null);
  const { recent, addSearch } = useRecentSearches();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [coords, setCoords] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const online = useOffline();
  const { convertTemp } = useUnit();
  const isFavorite = city && favorites.some((f) => f.name === city);

  function handleToggleFavorite() {
    if (isFavorite) {
      removeFavorite(city);
    } else {
      addFavorite({
        name: city,
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      });
    }
  }

  async function handleSearch(query) {
    try {
      setLoading(true);
      setError("");

      const results = await searchCity(query);

      if (!results.length) {
        throw new Error("City not found");
      }

      const selected = results[0];

      const weatherData = await getWeather(
        selected.latitude,
        selected.longitude
      );

      setCity(`${selected.name}, ${selected.country}`);
      setWeather(weatherData);
      setCoords({ latitude: selected.latitude, longitude: selected.longitude });

      // update URL for sharing
      const params = new URLSearchParams();
      params.set("q", `${selected.name}, ${selected.country}`);
      params.set("lat", selected.latitude);
      params.set("lon", selected.longitude);
      window.history.replaceState({}, "", `?${params.toString()}`);

      // store recent search
      addSearch(`${selected.name}, ${selected.country}`);

      const aqiData = await getAirQuality(
        selected.latitude,
        selected.longitude
      );

      setAirQuality(aqiData);
    } catch (err) {
      setError(err.message || "Error fetching data");
      setWeather(null);
      setAirQuality(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleCurrentLocation() {
    try {
      setLoading(true);

      const position = await getCurrentPosition();

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const weatherData = await getWeather(lat, lon);

      setCity("Current Location");
      setWeather(weatherData);
      setCoords({ latitude: lat, longitude: lon });

      const aqiData = await getAirQuality(lat, lon);
      setAirQuality(aqiData);
      addSearch("Current Location");
      const params = new URLSearchParams();
      params.set("q", "Current Location");
      params.set("lat", lat);
      params.set("lon", lon);
      window.history.replaceState({}, "", `?${params.toString()}`);
    } catch (err) {
      console.warn(err);
      setError("Unable to access location");
      setWeather(null);
      setAirQuality(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = params.get("lat");
    const lon = params.get("lon");
    const q = params.get("q");

    async function loadFromParams() {
      if (lat && lon) {
        try {
          setLoading(true);
          const weatherData = await getWeather(Number(lat), Number(lon));
          setCity(q || "Shared Location");
          setWeather(weatherData);
          setCoords({ latitude: Number(lat), longitude: Number(lon) });
          const aqiData = await getAirQuality(Number(lat), Number(lon));
          setAirQuality(aqiData);
        } catch (err) {
          console.warn(err);
        } finally {
          setLoading(false);
        }
      }
    }

    loadFromParams();
  }, []);

  async function handleMapSelect(mapLat, mapLon) {
    try {
      setLoading(true);
      setError("");

      const cityName = await reverseGeocode(mapLat, mapLon);
      const weatherData = await getWeather(mapLat, mapLon);

      setCity(cityName || `${mapLat.toFixed(3)}, ${mapLon.toFixed(3)}`);
      setWeather(weatherData);
      setCoords({ latitude: mapLat, longitude: mapLon });

      const aqiData = await getAirQuality(mapLat, mapLon);
      setAirQuality(aqiData);

      if (cityName) addSearch(cityName);
    } catch (err) {
      console.warn(err);
      setError("Could not fetch weather for this location");
    } finally {
      setLoading(false);
    }
  }

  function handleShare() {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setShareMessage("Link copied to clipboard");
        setTimeout(() => setShareMessage(""), 2000);
      });
    } else {
      try {
        window.prompt("Copy link:", url);
      } catch (err) { console.warn(err); }
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 dark:text-white">WeatherScope</h1>
        <SEO title={city ? `${city} — WeatherScope` : "WeatherScope"} />

        {!online && (
          <div className="bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 rounded-xl px-4 py-3 mb-4 text-sm" role="alert">
            You are offline. Showing cached data if available.
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
            <RecentSearches recent={recent} onSelect={handleSearch} />
          </div>

          <LocationButton onLocate={handleCurrentLocation} />
        </div>

        <div aria-live="polite" aria-atomic="true">
          {loading && <WeatherSkeleton count={1} />}

          {error && (
            <p className="mt-4 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-xl px-4 py-3" role="alert">
              {error}
            </p>
          )}
        </div>

        {!loading && !weather && !error && (
          <FadeIn>
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 sm:p-12 mt-6 text-center transition-colors">
              <FaCloudSun className="text-5xl mb-4 mx-auto text-blue-500" />
              <h2 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">Welcome to WeatherScope</h2>
              <p className="text-gray-500 dark:text-gray-400">Search for a city or use your current location to get started.</p>
            </div>
          </FadeIn>
        )}

        {weather && (
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex-1 w-full">
                <WeatherCard
                  city={city}
                  weather={weather}
                  convertTemp={convertTemp}
                  isFavorite={isFavorite}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {city && (
                  <button
                    onClick={handleShare}
                    aria-label="Share weather"
                    className="bg-gray-200 dark:bg-slate-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600 px-4 py-2 rounded-xl transition-colors"
                  >
                    Share
                  </button>
                )}
                {shareMessage && <span className="text-sm text-green-600 dark:text-green-400 self-center">{shareMessage}</span>}
              </div>
            </div>

            <WeatherAlerts weather={weather} />

            {airQuality && <AQICard airQuality={airQuality} />}

            <HourlyForecast data={weather?.hourly} convertTemp={convertTemp} />
            <DailyForecast data={weather?.daily} convertTemp={convertTemp} />

            <Suspense fallback={<WeatherSkeleton count={2} />}>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <TemperatureChart weather={weather} />
                <HumidityChart weather={weather} />
                <WindSpeedChart weather={weather} />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {airQuality && <AQITrendChart airQuality={airQuality} />}
                <ForecastChart weather={weather} />
              </div>
            </Suspense>

            <Highlights weather={weather} />

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => setShowSummary((s) => !s)}
                className="bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-xl transition-colors"
              >
                {showSummary ? "Hide AI Summary" : "AI Weather Summary"}
              </button>

              <Suspense fallback={null}>
                <ExportPDF weather={weather} city={city} />
              </Suspense>
            </div>

            {showSummary && (
              <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5 mt-4">
                <h3 className="font-bold mb-2 text-indigo-800 dark:text-indigo-200">Weather Summary</h3>
                <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed">
                  {generateWeatherSummary(weather)}
                </p>
              </div>
            )}

            {coords && (
              <div className="mt-6">
                <button
                  onClick={() => setShowMap((s) => !s)}
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors"
                  aria-expanded={showMap}
                >
                  {showMap ? "Hide map" : "Show map"}
                </button>

                {showMap && (
                  <Suspense fallback={<div className="mt-4">Loading map...</div>}>
                    <WeatherMap
                      lat={coords.latitude}
                      lon={coords.longitude}
                      weather={weather}
                      city={city}
                      onCitySelect={handleMapSelect}
                    />
                  </Suspense>
                )}
              </div>
            )}
          </FadeIn>
        )}
      </div>
    </main>
  );
}
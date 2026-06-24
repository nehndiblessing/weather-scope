import React, { useEffect, useState } from "react";

export default function WeatherMap({ lat, lon, weather, city, onCitySelect }) {
  const [Leaflet, setLeaflet] = useState(null);
  const [showRadar, setShowRadar] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([RL, L]) => {
      if (mounted) setLeaflet({ RL, L });
    });

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const id = "leaflet-css";
        if (!document.getElementById(id)) {
          const link = document.createElement("link");
          link.id = id;
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
        }
      } catch (err) { console.warn(err); }
    }
  }, []);

  if (!Leaflet) return <div className="p-6">Loading map...</div>;

  const { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } = Leaflet.RL;

  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        onCitySelect?.(clickLat, clickLng);
      },
    });
    return null;
  }

  const current = weather?.current;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-4 mt-4 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">Map</h3>
        <button
          onClick={() => setShowRadar((s) => !s)}
          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
            showRadar
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-slate-700 dark:text-gray-200"
          }`}
        >
          {showRadar ? "Radar ON" : "Radar OFF"}
        </button>
      </div>
      <div className="h-64 sm:h-80 md:h-96 rounded overflow-hidden">
        <MapContainer
          center={[lat || 0, lon || 0]}
          zoom={10}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {showRadar && (
            <TileLayer url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY" />
          )}
          <ZoomControl position="bottomright" />
          <MapClickHandler />
          {lat && lon && (
            <Marker position={[lat, lon]}>
              <Popup>
                <div className="text-sm min-w-32">
                  <p className="font-bold text-base mb-1">{city || "Location"}</p>
                  {current ? (
                    <>
                      <p>{current.temperature_2m}°C</p>
                      <p className="text-gray-500">Feels like {current.apparent_temperature}°C</p>
                      <p className="text-gray-500">Humidity: {current.relative_humidity_2m}%</p>
                      <p className="text-gray-500">Wind: {current.wind_speed_10m} km/h</p>
                    </>
                  ) : (
                    <p className="text-gray-500">{lat.toFixed(3)}, {lon.toFixed(3)}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Click anywhere on map to select a location</p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

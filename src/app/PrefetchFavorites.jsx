import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { searchCity } from "../api/geocodeApi";
import { getWeather } from "../api/weatherApi";
import { getAirQuality } from "../api/airQualityApi";

export default function PrefetchFavorites() {
  const qc = useQueryClient();

  useEffect(() => {
    const run = async () => {
      try {
        const stored = localStorage.getItem("favorites");

        if (!stored) return;

        const favorites = JSON.parse(stored || "[]");

        // Migration: if any favorites are plain strings, geocode them and upgrade to objects with coords
        const hasString = favorites.some((f) => typeof f === "string");

        if (hasString) {
          const migrated = [];

          for (const f of favorites) {
            if (typeof f !== "string") {
              migrated.push(f);
              continue;
            }

            try {
              const results = await searchCity(f);
              if (!results.length) {
                migrated.push({ name: f });
                continue;
              }

              const sel = results[0];
              migrated.push({ name: f, latitude: sel.latitude, longitude: sel.longitude });
            } catch (err) {
              console.warn(err);
              migrated.push({ name: f });
            }
          }

          try {
            localStorage.setItem("favorites", JSON.stringify(migrated));
          } catch (err) {
            console.warn(err);
          }

          // use migrated list for prefetching
          favorites.length = 0;
          favorites.push(...migrated);
        }

        await Promise.all(
          favorites.map(async (fav) => {
            try {
              // normalize
              const item = typeof fav === "string" ? { name: fav } : fav;

              if (qc.getQueryData(["weather", item.name])) return;

              if (item.latitude != null && item.longitude != null) {
                const weather = await getWeather(item.latitude, item.longitude);
                qc.setQueryData(["weather", item.name], weather);

                // prefetch AQI
                try {
                  const aqi = await getAirQuality(item.latitude, item.longitude);
                  qc.setQueryData(["aqi", item.name], aqi);
                } catch (err) {
                  console.warn(err);
                }

                return;
              }

              // fallback to geocoding
              const results = await searchCity(item.name);
              if (!results.length) return;

              const sel = results[0];
              const weather = await getWeather(sel.latitude, sel.longitude);
              qc.setQueryData(["weather", item.name], weather);

              try {
                const aqi = await getAirQuality(sel.latitude, sel.longitude);
                qc.setQueryData(["aqi", item.name], aqi);
              } catch (err) {
                console.warn(err);
              }
            } catch (err) {
              console.warn(err);
            }
          })
        );
      } catch (err) {
        console.warn(err);
      }
    };

    run();
  }, [qc]);

  return null;
}

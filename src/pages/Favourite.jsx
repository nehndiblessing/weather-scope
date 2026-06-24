import React, { useState, Suspense } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useFavorites from "../hooks/useFavourite";
import { searchCity } from "../api/geocodeApi";
import { getWeather } from "../api/weatherApi";
import WeatherCard from "../components/weather/WeatherCard";
import useUnit from "../hooks/useUnit";
const TemperatureChart = React.lazy(() => import("../components/charts/TemperatureChart"));
const HumidityChart = React.lazy(() => import("../components/charts/HumidityChart"));

export default function FavoritesPage() {
	const { favorites, removeFavorite } = useFavorites();

	const [data, setData] = useState({});

	const qc = useQueryClient();
	const { convertTemp } = useUnit();

	async function loadCity(city) {
		// if already loading or loaded, toggle expand
		const entry = data[city] || {};

		if (entry.loading) return;

		if (entry.weather) {
			setData((s) => ({
				...s,
				[city]: { ...entry, expanded: !entry.expanded },
			}));
			return;
		}

		setData((s) => ({ ...s, [city]: { loading: true } }));

		try {
			// try to use cached weather from react-query first
			const cached = qc.getQueryData(["weather", city]);

			if (cached) {
				setData((s) => ({ ...s, [city]: { loading: false, weather: cached, expanded: true } }));
				return;
			}

			const results = await searchCity(city);

			if (!results.length) throw new Error("Not found");

			const sel = results[0];

			const weather = await getWeather(sel.latitude, sel.longitude);

			setData((s) => ({
				...s,
				[city]: { loading: false, weather, expanded: true },
			}));
		} catch (err) {
			setData((s) => ({ ...s, [city]: { loading: false, error: err.message } }));
		}
	}

	if (!favorites.length) {
		return (
			<div className="p-6">
				<h2 className="text-2xl font-bold mb-4">Favorites</h2>
				<p>No favorites yet.</p>
			</div>
		);
	}

	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold mb-4">Favorites</h2>

			<ul className="space-y-4">
				{favorites.map((fav) => {
					const city = fav.name;
					const entry = data[city] || {};

					return (
						<li key={city} className="bg-white dark:bg-slate-800 p-4 rounded shadow">
							<div className="flex items-center justify-between gap-4">
								<div className="font-semibold truncate flex items-center gap-3">
									{(() => {
										const cached = qc.getQueryData(["weather", city]);
										if (cached) {
											const temp = cached.current?.temperature_2m;
											const aqi = qc.getQueryData(["aqi", city]);
											return (
												<>
													<span className="text-3xl">{temp ? convertTemp(temp) : ''}</span>
													<span className="text-sm text-gray-500 ml-2">{aqi ? `AQI ${aqi.current?.us_aqi ?? ''}` : ''}</span>
												</>
											);
										}
										return null;
									})()}
								<div>{city}</div>
								</div>

								<div className="flex items-center gap-2">
									<button
										onClick={() => loadCity(city)}
										className="bg-sky-600 text-white px-3 py-2 rounded"
									>
										{entry.loading ? "Loading..." : entry.weather ? (entry.expanded ? "Hide" : "View") : "View"}
									</button>

									<button
										onClick={() => removeFavorite(fav)}
										className="text-red-500 px-3 py-2"
									>
										Remove
									</button>
								</div>
							</div>

							{entry.error && <p className="text-red-500 mt-2">{entry.error}</p>}

							{entry.expanded && entry.weather && (
								<div className="mt-4">
									<WeatherCard city={city} weather={entry.weather} convertTemp={convertTemp} />

									<Suspense fallback={<div className="mt-4">Loading charts...</div>}>
										<div className="grid md:grid-cols-2 gap-4 mt-4">
											<TemperatureChart weather={entry.weather} />
											<HumidityChart weather={entry.weather} />
										</div>
									</Suspense>
								</div>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

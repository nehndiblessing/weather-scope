export async function getAirQuality(
  lat,
  lon
) {
  const url =
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&current=us_aqi,pm10,pm2_5,ozone` +
    `&hourly=us_aqi`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "AQI fetch failed"
    );
  }

  return response.json();
}
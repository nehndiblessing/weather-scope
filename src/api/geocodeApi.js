export async function searchCity(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5`
  );

  if (!response.ok) {
    throw new Error(`Geocoding API error (${response.status})`);
  }

  const data = await response.json();

  return data.results || [];
}

export async function reverseGeocode(lat, lon) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`
  );

  if (!response.ok) return null;

  const data = await response.json();

  return (
    data.address &&
    (data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.country || "Unknown")
  );
}
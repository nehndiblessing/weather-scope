# WeatherScope

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CI/CD](https://github.com/YOUR_USERNAME/weather-scope/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/weather-scope/actions/workflows/ci.yml)
[![PWA](https://img.shields.io/badge/PWA-ready-brightgreen)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)

A modern, feature-rich weather dashboard built with React 19, Vite, and Tailwind CSS. Real-time forecasts, air quality, interactive maps, and more — with full PWA and offline support.

![WeatherScope Screenshot](./screenshots/dashboard.png)

---

## Features

### Core
- **Current Weather** — temperature, feels like, humidity, wind, pressure, visibility
- **7-Day Forecast** — daily highs/lows and 24-hour hourly breakdown
- **Air Quality Index (AQI)** — live AQI, PM2.5, PM10, ozone with color-coded status
- **City Search** — geocoding auto-complete with recent searches
- **Current Location** — one-click weather from geolocation

### Advanced

| Feature | Description |
|---|---|
| **Interactive Maps** | Leaflet map with click-to-select location and weather popup |
| **Weather Radar** | Toggle precipitation radar overlay on the map |
| **Charts & Trends** | Temperature, humidity, wind speed, AQI trends, and 7-day forecast bars |
| **City Comparison** | Compare weather side-by-side across multiple cities |
| **Severe Weather Alerts** | Automatic detection of heat, wind, and UV warnings |
| **AI Weather Summary** | Auto-generated natural-language summary of current conditions |
| **Unit Conversion** | Toggle between °C and °F — persists across sessions |
| **Export PDF** | Capture and print a full weather report as PDF |
| **Favorites** | Save cities with prefetched weather and AQI for fast access |
| **Dark Mode** | System-aware dark/light theme toggle |
| **PWA** | Installable as a standalone app with offline caching via Workbox |
| **Offline Support** | Cached API responses and map tiles for offline use |
| **Responsive** | Mobile-first design with collapsible sidebar |

---

## Live Demo

> **🌐 [weatherscope.app](https://YOUR_USERNAME.github.io/weather-scope)** — deployed via GitHub Actions.

![Demo GIF](./screenshots/demo.gif)

---

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/weather-scope.git
cd weather-scope

npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build
npm run lint       # run ESLint
```

### Environment

Copy the example file (no API keys required by default):

```bash
cp .env.example .env
```

The app uses the free [Open-Meteo API](https://open-meteo.com/) — no registration needed.

---

## Screenshots

| Dashboard | Compare Cities | AQI Card |
|---|---|---|
| ![Dashboard](./screenshots/dashboard.png) | ![Compare](./screenshots/compare.png) | ![AQI](./screenshots/aqi.png) |

> **Tip:** Use the built-in **Screenshot** button in the Navbar to capture your own screenshots.

---

## Architecture

```
src/
├── api/            # Centralized API layer (weather, geocode, air quality)
├── app/            # App-level: providers, router, layout, prefetch
├── assets/         # Static assets
├── components/     # Reusable UI components
│   ├── charts/     # Recharts-based charts (temp, humidity, wind, AQI, forecast)
│   ├── layout/     # Navbar, Sidebar
│   ├── ui/         # ThemeToggle, FadeIn, PwaUpdatePrompt, ExportPDF, etc.
│   └── weather/    # WeatherCard, SearchBar, HourlyForecast, WeatherMap, etc.
├── context/        # ThemeContext, UIContext
├── hooks/          # Custom hooks (useDebounce, useCitySearch, useFavourite, etc.)
├── pages/          # Route pages (Home, Compare, Favourites, Settings)
└── utils/          # Utility functions (aqi, weatherCodes, weatherAlerts, weatherSummary)
```

### Key Libraries

- **React 19** + **Vite 8** — fast dev and build
- **Tailwind CSS 4** — utility-first styling
- **@tanstack/react-query** — data fetching, caching, prefetching
- **React Router** — lazy-loaded routes
- **Recharts** — interactive charts
- **Leaflet** + **react-leaflet** — maps
- **Framer Motion** — animations (with CSS fallback)
- **html2canvas** — screenshot capture
- **vite-plugin-pwa** — PWA + service worker

---

## Deployment

The included GitHub Actions workflow (`.github/workflows/ci.yml`):

1. Runs `npm ci` and `npm run build` on every push/PR
2. Deploys to GitHub Pages on pushes to `main`

To deploy to Netlify or Vercel, point their CLI or dashboard at the `dist/` folder.

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

---

## Advanced Usage

### Historical Data

The Compare page allows side-by-side weather comparison. Extend it with historical data from the [Open-Meteo Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api).

### Weather Radar

Toggle **Radar ON** on the map to overlay precipitation data. Requires an [OpenWeatherMap API key](https://openweathermap.org/api) — set it in `WeatherMap.jsx`.

---

## License

[MIT](LICENSE) © 2026 WeatherScope

---

## Contributing

Pull requests and issues are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines (if present).

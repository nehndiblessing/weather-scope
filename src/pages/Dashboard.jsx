import { Link } from "react-router-dom";

export default function Dashboard() {
	return (
		<main className="min-h-screen p-8">
			<h1 className="text-4xl font-bold mb-4">WeatherScope</h1>

			<p className="mb-6">Welcome to the dashboard. Use the links below to navigate the app.</p>

			<div className="flex gap-3">
				<Link to="/" className="px-4 py-2 bg-gray-200 rounded">Home</Link>
				<Link to="/compare" className="px-4 py-2 bg-gray-200 rounded">Compare</Link>
				<Link to="/favorites" className="px-4 py-2 bg-gray-200 rounded">Favorites</Link>
				<Link to="/settings" className="px-4 py-2 bg-gray-200 rounded">Settings</Link>
			</div>
		</main>
	);
}

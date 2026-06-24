import { useTheme } from "../context/ThemeContext";
import useUnit from "../hooks/useUnit";

export default function Settings() {
	const { theme, setTheme } = useTheme();
	const { unit, toggleUnit } = useUnit();

	return (
		<div className="p-4 sm:p-6">
			<h2 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">Settings</h2>

			<div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-5 sm:p-6 space-y-6 transition-colors">
				<div className="flex items-center justify-between">
					<div>
						<p className="font-medium dark:text-white">Dark Mode</p>
						<p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark/light theme</p>
					</div>
					<button
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						role="switch"
						aria-checked={theme === "dark"}
						aria-label="Toggle dark mode"
						className={`relative w-12 h-7 rounded-full transition-colors ${
							theme === "dark" ? "bg-blue-600" : "bg-gray-300"
						}`}
					>
						<span
							className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
								theme === "dark" ? "translate-x-5" : "translate-x-0"
							}`}
						/>
					</button>
				</div>

				<div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
					<div>
						<p className="font-medium dark:text-white">Temperature Unit</p>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Current: {unit === "celsius" ? "°C (Celsius)" : "°F (Fahrenheit)"}
						</p>
					</div>
					<button
						onClick={toggleUnit}
						role="switch"
						aria-checked={unit === "fahrenheit"}
						aria-label="Toggle temperature unit"
						className={`relative w-12 h-7 rounded-full transition-colors ${
							unit === "fahrenheit" ? "bg-blue-600" : "bg-gray-300"
						}`}
					>
						<span
							className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
								unit === "fahrenheit" ? "translate-x-5" : "translate-x-0"
							}`}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

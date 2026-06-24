export default function RecentSearches({ recent, onSelect }) {
  if (!recent.length) return null;

  return (
    <div className="flex gap-2 flex-wrap mt-4">
      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 self-center">Recent:</span>
      {recent.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className="bg-gray-200 dark:bg-slate-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 px-3 py-1.5 rounded-full text-sm transition-colors"
        >
          {city}
        </button>
      ))}
    </div>
  );
}
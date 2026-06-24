export default function LocationButton({ onLocate }) {
  return (
    <button
      onClick={onLocate}
      aria-label="Use current location"
      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
    >
      Use My Location
    </button>
  );
}
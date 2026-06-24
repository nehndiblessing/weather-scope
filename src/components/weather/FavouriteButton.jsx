export default function FavoriteButton({ onAdd }) {
  return (
    <button
      onClick={() => onAdd?.()}
      aria-label="Save city to favorites"
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
    >
      ⭐ Save City
    </button>
  );
}
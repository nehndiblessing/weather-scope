import { FaStar } from "react-icons/fa";

export default function FavoriteButton({ onAdd }) {
  return (
    <button
      onClick={() => onAdd?.()}
      aria-label="Save city to favorites"
      className="inline-flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
    >
      <FaStar />
      <span>Save City</span>
    </button>
  );
}
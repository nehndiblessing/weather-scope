import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WeatherSkeleton({ count = 1 }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <Skeleton height={40} />
          <Skeleton height={100} className="mt-4" />
          <Skeleton count={4} className="mt-2" />
        </div>
      ))}
    </div>
  );
}
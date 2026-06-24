import { useState, useEffect } from "react";
import { searchCity } from "../api/geocodeApi";
import useDebounce from "./useDebounce";

export default function useCitySearch(query) {
  const debouncedQuery = useDebounce(query, 400);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const data = await searchCity(debouncedQuery);
        if (!cancelled) setResults(data);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [debouncedQuery]);

  return { results, loading };
}

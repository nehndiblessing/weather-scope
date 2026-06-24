import { ErrorBoundary } from "react-error-boundary";
import { useTheme } from "../../context/ThemeContext";

function Fallback({ error, resetErrorBoundary }) {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-slate-900 transition-colors">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 sm:p-12 max-w-lg w-full text-center transition-colors">
        <p className="text-5xl mb-4">⚠️</p>
        <h2 className="text-2xl font-bold mb-2 dark:text-white">Something went wrong</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{error?.message || "An unexpected error occurred."}</p>

        <details className="mb-6 text-left text-xs text-gray-400 dark:text-gray-500 whitespace-pre-wrap max-h-40 overflow-y-auto bg-gray-100 dark:bg-slate-900 rounded-xl p-3">
          <summary className="cursor-pointer text-sm font-medium">Stack trace</summary>
          {error?.stack}
        </details>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
          >
            Try again
          </button>
          <button
            onClick={() => {
              try {
                console.error(error);
                alert("Error details logged to console.");
              } catch (err) { console.warn(err); }
            }}
            className="px-6 py-3 bg-gray-200 dark:bg-slate-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-xl transition-colors"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ErrorBoundary>
  );
}
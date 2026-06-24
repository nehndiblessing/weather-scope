import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import Providers from "./app/providers";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import PrefetchFavorites from "./app/PrefetchFavorites";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <QueryClientProvider client={queryClient}>
        <PrefetchFavorites />
        <App />
      </QueryClientProvider>
    </Providers>
  </React.StrictMode>
);
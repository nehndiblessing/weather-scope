import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./Layout";

const Home = lazy(() => import("../pages/Home"));
const Compare = lazy(() => import("../pages/Compare"));
const Favorites = lazy(() => import("../pages/Favourite"));
const Settings = lazy(() => import("../pages/Settings"));

function SuspenseWrapper({ Component }) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading...</div>}>
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <SuspenseWrapper Component={Home} /> },
      { path: "compare", element: <SuspenseWrapper Component={Compare} /> },
      { path: "favorites", element: <SuspenseWrapper Component={Favorites} /> },
      { path: "settings", element: <SuspenseWrapper Component={Settings} /> },
    ],
  },
]);
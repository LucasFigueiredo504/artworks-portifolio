import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import App from "./App";
//import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    //errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

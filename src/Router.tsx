import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import App from "./App";
import About from "./pages/About";
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
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

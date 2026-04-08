import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import App from "./App";
import { FilePage } from "./pages/FilePage";
import { GalleryPage } from "./pages/GalleryPage";
import { StoryPage } from "./pages/StoryPage";
import StoriesPage from "./pages/StoriesPage";
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
        path: "produto/:slug",
        element: <FilePage />,
      },
      {
        path: "stories/:id",
        element: <StoryPage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "stories",
        element: <StoriesPage />,
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

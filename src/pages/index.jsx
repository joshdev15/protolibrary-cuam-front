import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <div>Protolibrary About</div>,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

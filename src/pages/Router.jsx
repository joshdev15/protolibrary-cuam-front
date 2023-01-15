import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import UploadFile from "./UploadFile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/upload-file",
    element: <UploadFile />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

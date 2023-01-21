import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import UploadFile from "./UploadFile";
import UploadRequest from "./UploadRequest";
import UserRoles from "./UserRoles";
import UserResgistration from "./UserRegistration";
import Error404 from "./Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/upload-file",
    element: <UploadFile />,
    errorElement: <Error404 />,
  },
  {
    path: "/requests",
    element: <UploadRequest />,
    errorElement: <Error404 />,
  },
  {
    path: "/user-roles",
    element: <UserRoles />,
    errorElement: <Error404 />,
  },
  {
    path: "/user-registration",
    element: <UserResgistration />,
    errorElement: <Error404 />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

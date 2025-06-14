import { useState } from "react";
import { useRoutes } from "react-router";
import Frontpage from "./pages/frontpage/frontpage";
import SinglePost from "./pages/singlePost/singlePost.jsx";
import Nav from "./comps/nav/nav.jsx";
import Footer from "./comps/footer/footer.jsx";
import { ToastContainer } from "react-toastify";

export default function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Frontpage />,
    },
    {
      path: "/post/:postid",
      element: <SinglePost />,
    },
  ]);

  return (
    <>
      <ToastContainer />
      <Nav name={"Navns"} />
      {routes}
      <Footer />
    </>
  );
}

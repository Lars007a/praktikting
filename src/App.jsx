import { useState } from "react";
import { useRoutes } from "react-router";
import Frontpage from "./pages/frontpage/frontpage";
import Singlepost from "./pages/singlePost/singlePost.jsx";
import Nav from "./comps/nav/nav.jsx";
import Footer from "./comps/footer/footer.jsx";

export default function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Frontpage />,
    },
    {
      path: "/post/:postid",
      element: <Singlepost />,
    },
  ]);

  return (
    <>
      <Nav name={"Navns"} />
      {routes}
      <Footer />
    </>
  );
}

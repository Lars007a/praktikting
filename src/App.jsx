import { useState } from "react";
import { useRoutes } from "react-router";
import Frontpage from "./pages/frontpage/frontpage";
import Singlepost from "./pages/singlePost/singlePost.jsx";

function App() {
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

  return <>{routes}</>;
}

export default App;

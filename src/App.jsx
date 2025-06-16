import { useEffect, useState } from "react";
import { useRoutes } from "react-router";
import Frontpage from "./pages/frontpage/frontpage";
import SinglePost from "./pages/singlePost/singlePost.jsx";
import Nav from "./comps/nav/nav.jsx";
import Footer from "./comps/footer/footer.jsx";
import { ToastContainer } from "react-toastify";
import Backoffice from "./pages/backoffice/backoffice.jsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import Loginpage from "./pages/loginpage/loginpage.jsx";
import LoginProtected from "./comps/loginprotected/loginprotected.jsx";

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
    {
      path: "/backoffice",
      element: (
        <LoginProtected>
          <Backoffice />
        </LoginProtected>
      ),
    },
    {
      path: "/login",
      element: <Loginpage />,
    },
  ]);

  const [theme, setTheme] = useLocalStorage("dark");

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev == "dark" ? "light" : "dark"));
  };

  return (
    <>
      <ToastContainer />
      <Nav name={"Navns"} themeChanger={toggleTheme} />
      {routes}
      <Footer themeChanger={toggleTheme} />
    </>
  );
}

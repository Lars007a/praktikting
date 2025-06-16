import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function loginProtected({ children }) {
  const [login, setLogin] = useLocalStorage("login", null);
  const navigate = useNavigate();

  useEffect(() => {
    if (login == null) {
      navigate("/login");
    }
  }, [login]);

  return children;
}

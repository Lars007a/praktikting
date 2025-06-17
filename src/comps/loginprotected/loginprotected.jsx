import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function loginProtected({ children }) {
  //Beskytter backoffice siden, mod dem der ikke har en token sat.

  const [login, setLogin] = useLocalStorage("login", null); //Få token fra localstorage. Hvis ikke en er sat, så null.
  const navigate = useNavigate();

  useEffect(() => {
    //Når loader, og når login ændre sig, tjekker vi om token er sat, eller er default værdi.
    //og navigere dem til login siden, hvis ikke er sat.
    if (login == null) {
      navigate("/login");
    }
  }, [login]);

  return children;
}

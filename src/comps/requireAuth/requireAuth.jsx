import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useLayoutEffect, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router";
import { useSendData } from "../../hooks/usePosts.jsx";
import { toast } from "react-toastify";

export default function RequireAuth({ children }) {
  //Beskytter backoffice siden, mod dem der ikke har en token sat.
  //Samt login siden, mod dem der er logget ind.

  const [login, setLogin] = useLocalStorage("login", null); //Få token fra localstorage. Hvis ikke en er sat, så null.
  const navigate = useNavigate(); //Til at redirect.
  const loc = useLocation(); //Til at få vores nuværende location.
  const sender = useSendData(); //Til at sende api requests.




  //Hvis vi så har en token.
  useEffect(() => {

    //Hvis der er en token, validere den.
    sender.validateToken().then((json) => {
      
      //Bad token.
      if(json.status == "not ok") {
        throw new Error(json.message); //Throw error og handle det.
      }

      //ok token, men loginside accessing. Redirect til backoffice.
      if(json.status == "ok" && loc.pathname == "/login") {
        navigate("/backoffice");
      }

      //Hvis ok token, men anden protected side end login, så ikke gør noget.
      return;
    }).catch((error) => {

      setLogin(null); //fjern bad token.

      if(loc.pathname != "/login") {
        //Hvis vi er på en anden side end loginsiden.
        navigate("/login");
        toast.error(error.message);
      }

      //Hvis er på login siden, bare ikke gør noget.
      return;

    });
        
    
  }, [login, login?.token, loc.pathname]); //Kør når ændre data gemt i localstorage. Plus når location ændre sig.

  //basis funktionalitet er at return children.
  return children;



}

import styles from "./backofficeSeeComments.module.css";
import { useSendData, useGetData } from "../../hooks/usePosts.jsx";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function backofficeSeeComments({ post }) {
  const useSend = useSendData(); //Til at sende data til api'en.
  const getData = useGetData(`post/${post}`); //get request til /post/:postid.

  const [coms, setComs] = useState([]); //kommentar der vises, default er en tom array.

  useEffect(() => {
    //når vi får kommentarne fra api'en, så sætter vi state variablen der bliver vist til de kommentar
    //der skal vises.
    if (getData.data == null || getData.data == undefined) return;
    setComs(getData.data.comments);
  }, [getData.data?.comments]);

  //Funktion til at slette kommentar.
  //skal bruge id på indlæg og kommentar.
  const delcomment = (postid, commentid) => {
    console.log(postid, commentid);

    useSend //sender bare en request til api'en.
      .deleteComment(postid, commentid)
      .then((val) => {
        if (val.status == "ok") {
          //Hvis success.
          toast.success("Kommentar fjernet!");
          getData.get();
        } else {
          throw new Error("Kunne ikke fjerne kommentar: " + val.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className={styles.ting}>
        {coms.length == 0 ? (
          <p>Ingen kommentar</p>
        ) : (
          coms.map((element, index) => {
            return (
              <div className={styles.com} key={index}>
                <div>
                  <p className={styles.title}>{element.name}</p>
                  <p className={styles.title}>{element.email}</p>
                </div>
                <p className={styles.text}>{element.text}</p>
                <button
                  className={styles.btn}
                  onClick={() => {
                    delcomment(post, element._id);
                  }}
                >
                  Fjern
                </button>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

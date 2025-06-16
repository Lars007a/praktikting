import styles from "./backofficeSeeComments.module.css";
import { useSendData, useGetData } from "../../hooks/usePosts.jsx";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function backofficeSeeComments({ post }) {
  const useSend = useSendData();
  const getData = useGetData(`post/${post}`);

  console.log(post);

  const [coms, setComs] = useState([]);
  useEffect(() => {
    if (getData.data == null || getData.data == undefined) return;
    setComs(getData.data.comments);
  }, [getData.data?.comments]);

  const delcomment = (postid, commentid) => {
    console.log(postid, commentid);

    useSend
      .deleteComment(postid, commentid)
      .then((val) => {
        if (val.status == "ok") {
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

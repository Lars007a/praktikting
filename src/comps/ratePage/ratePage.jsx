import styles from "./ratePage.module.css";
import Title from "../titleWithLine/titleWithLine.jsx";
import { useSendData, useGetData } from "../../hooks/usePosts.jsx";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ratePage({}) {
  const useSend = useSendData();
  const useGet = useGetData("getRating");

  const rate = (rating) => {
    useSend
      .sendRating(rating)
      .then((val) => {
        if (val.status == "ok") {
          toast.success("Success! Du ratede siden: " + rating);
          useGet.get();
          return;
        }

        throw new Error(val.message);
      })
      .catch((error) => {
        toast.error("Kunne ikke sende rating: " + error.message);
      });
  };

  useEffect(() => {
    console.log(useGet)
  }, [useGet.data]);

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textSec}>
            <h2>Vurdere hjemmesiden</h2>
            <p>
              Den nuværende rating er:{" "}
              <span>{useGet.loading ? "loading..." : useGet.data ? useGet.data.toFixed(2) : "0"}</span>
            </p>
          </div>
          <div className={styles.ratingSec}>
            <button
              className="stdInputBtn"
              onClick={() => {
                rate(1);
              }}
            >
              1
            </button>
            <button
              className="stdInputBtn"
              onClick={() => {
                rate(2);
              }}
            >
              2
            </button>
            <button
              className="stdInputBtn"
              onClick={() => {
                rate(3);
              }}
            >
              3
            </button>
            <button
              className="stdInputBtn"
              onClick={() => {
                rate(4);
              }}
            >
              4
            </button>
            <button
              className="stdInputBtn"
              onClick={() => {
                rate(5);
              }}
            >
              5
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

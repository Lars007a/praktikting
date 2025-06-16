import styles from "./backoffice.module.css";
import Title from "../../comps/titleWithLine/titleWithLine";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import BackofficePosts from "../../comps/backofficePosts/backofficePosts.jsx";
import { useGetData } from "../../hooks/usePosts.jsx";

export default function backoffice() {
  const postObj = useGetData("posts");

  const [pageToShow, setPageToShow] = useState();

  useEffect(() => {
    if (postObj.data == null || postObj.data == undefined) return;

    setPageToShow(
      <BackofficePosts data={postObj.data} changePage={setPageToShow} />
    );
  }, [postObj.data]);

  return (
    <div className="container">
      <div className={styles.content}>{pageToShow}</div>
    </div>
  );
}

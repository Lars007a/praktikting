import styles from "./header.module.css";
import Searchbox from "../searchbox/searchbox.jsx";

export default function header({ img, frontpage = false, title = "" }) {
  return (
    <>
      <header
        className={styles.header}
        style={{ backgroundImage: `url(${img})` }}
      >
        {frontpage ? (
          <Searchbox></Searchbox>
        ) : (
          <h1 className={`${styles.notFrontpageText} title`}>{title}</h1>
        )}
      </header>
    </>
  );
}

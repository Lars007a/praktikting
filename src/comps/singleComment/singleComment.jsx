import styles from "./singleComment.module.css";

export default function singleComment({ name, date, text }) {
  return (
    <>
      <article className={styles.comment}>
        <div className={styles.top}>
          <h3>{name}</h3>
          <h3>{date}</h3>
        </div>

        <p>{text}</p>
      </article>
    </>
  );
}

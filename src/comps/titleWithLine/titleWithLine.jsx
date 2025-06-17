import styles from "./titleWithLine.module.css";

export default function title({ title }) {
  //Simpel title med en linje ved siden af. Style.
  return (
    <div className={`${styles.title}`}>
      <h2>{title}</h2>
      <div className={styles.line}></div>
    </div>
  );
}

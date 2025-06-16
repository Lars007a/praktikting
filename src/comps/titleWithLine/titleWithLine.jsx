import styles from "./titleWithLine.module.css";

export default function title({ title, black = false }) {
  return (
    <div className={`${styles.title} ${black ? styles.black : ""}`}>
      <h2>{title}</h2>
      <div className={styles.line}></div>
    </div>
  );
}

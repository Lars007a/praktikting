import styles from "./titleWithLine.module.css";

export default function title({ title }) {
  return (
    <div className={styles.title}>
      <h2>{title}</h2>
      <div className={styles.line}></div>
    </div>
  );
}

import styles from "./errorBox.module.css";

export default function errorBox({ msg }) {
  return (
    <div className={styles.errorbox}>
      <p>{msg}</p>
    </div>
  );
}

import styles from "./errorBox.module.css";

export default function errorBox({ msg }) {
  //Simpel fejl beskeds boks til når der er fejl.
  return (
    <div className={styles.errorbox}>
      <p>{msg}</p>
    </div>
  );
}

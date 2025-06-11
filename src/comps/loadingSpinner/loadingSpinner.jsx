import styles from "./loadingSpinner.module.css";
import { ClipLoader } from "react-spinners";

export default function loadingSpinner() {
  return (
    <div className={styles.con}>
      <ClipLoader size={40} loading={true} />
    </div>
  );
}

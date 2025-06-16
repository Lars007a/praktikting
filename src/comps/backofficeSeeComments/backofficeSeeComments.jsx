import styles from "./backofficeSeeComments.module.css";

export default function backofficeSeeComments({ coms = [] }) {
  console.log(coms);

  return (
    <>
      <div className={styles.ting}>
        {coms.map((element, index) => {
          return (
            <div className={styles.com} key={index}>
              <div>
                <p className={styles.title}>{element.name}</p>
                <p className={styles.title}>{element.email}</p>
              </div>
              <p className={styles.text}>{element.text}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

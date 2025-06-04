import styles from "./commentGrid.module.css";
import SingleComment from "../singleComment/singleComment.jsx";
import Title from "../titleWithLine/titleWithLine.jsx";
import AddComment from "../addComment/addComment.jsx";

export default function commentGrid({ comments = [] }) {
  return (
    <>
      <div className={styles.title}>
        <Title title={"Tilføj kommentar"} />
      </div>

      <AddComment />

      <div className={styles.title}>
        <Title title={"Kommentarer"} />
      </div>
      <section className={styles.grid}>
        {comments.map((element, index) => {
          return (
            <SingleComment
              name={element.name}
              date={element.date}
              text={element.text}
              key={index}
            />
          );
        })}
      </section>
    </>
  );
}

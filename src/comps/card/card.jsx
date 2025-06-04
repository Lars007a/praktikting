import styles from "./card.module.css";
import testpic from "../../assets/testpic.jpg";
import { FaHeart } from "react-icons/fa";
import { IoIosHeartDislike } from "react-icons/io";
import { FaComment } from "react-icons/fa";

export default function Card({
  img = testpic, //Default testing billed.
  title,
  date,
  text,
  likes,
  comments,
  category = [],
  changeBcColor = true,
  fullPostPage = false, //Hvis det er individual post siden, default er false.
}) {
  return (
    <article
      className={`${styles.card} ${
        changeBcColor ? styles.nottransparrent : ""
      }`}
    >
      {fullPostPage ? "" : <img src={img} alt="post img" />}
      <div className={styles.content}>
        <div className={styles.top}>
          <h3>{title}</h3>
          <h3>{date}</h3>
        </div>

        <p>{text}</p>

        <div className={styles.btns}>
          <button>
            <FaHeart />
            {likes} likes
          </button>
          <button>
            <FaComment />
            {comments} kommentarer
          </button>
        </div>

        <div className={styles.cat}>
          {category.map((element, index) => {
            return <p key={index}>{element}</p>;
          })}
        </div>
      </div>
    </article>
  );
}

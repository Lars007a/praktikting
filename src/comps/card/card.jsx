import styles from "./card.module.css";
import stdpic from "../../assets/standard.jpg";
import { FaHeart } from "react-icons/fa";
import { IoIosHeartDislike } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { useState } from "react";
import { useSendData } from "../../hooks/usePosts.jsx";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function Card({
  obj,
  updateFunc,
  changeBcColor = true,
  fullPostPage = false, //Hvis det er individual post siden, default er false.
}) {
  const sendDataObj = useSendData();

  const dateToShow = new Date(obj.date)
    .toLocaleString("da-dk", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .replaceAll(".", "/");

  const [textToShow, setTextToShow] = useState(obj.text);

  //Hver gang obj.text ændre sig, tjekker vi om vi er på single page, eller i lille card form,
  //Hvis vi er i lille card form, tjekker vi længden af obj.text, og minimere teksten hvis nødvendig.
  //Hvis ikke vi er i lille card form, men er derimod i single post page, så sætter vi text to show til hele teksten.
  useState(() => {
    if (!fullPostPage && obj.text.length >= 200) {
      let newText;

      newText = obj.text //tager obj.text
        .slice(0, 200) //tager karakter 0 til 200 i obj.text
        .trimEnd() //fjerner sidste mellemrum hvis det er der i den returnerede tekst (karakter 0 til 200 fra obj.text)
        .slice(0, obj.text.slice(0, 200).trimEnd().lastIndexOf(" ")); //tager så den tekst, og tager første karakter derfra, og fjerner indtil det sidste mellemrum i samme tekst, for at få det til at være et helt ord.

      setTextToShow(newText);
    } else {
      setTextToShow(obj.text);
    }
  }, []);

  const likefn = async () => {
    try {
      const result = await sendDataObj.addLike(obj._id);
      if (result.status == "ok") {
        toast.success("Success! Like tilføjet!");
        updateFunc();
      } else {
        throw new Error("Skete en fejl, prøv igen.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <article
      className={`${styles.card} ${
        changeBcColor ? styles.nottransparrent : ""
      }`}
    >
      {fullPostPage ? (
        ""
      ) : (
        <Swiper
          spaceBetween={1}
          slidesPerView={1}
          navigation
          modules={[Navigation]}
          className={styles.sliderWrapper}
        >
          {obj.img.map((element, index) => {
            return (
              <SwiperSlide key={index} className={styles.slide}>
                <div className={styles.postimg}>
                  <img src={element} alt="post img" />
                  {console.log(element)}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <div className={styles.content}>
        <div className={styles.top}>
          <div>
            <h3>{obj.title}</h3>
          </div>
          <div>
            <h3>{dateToShow}</h3>
          </div>
        </div>

        <p>
          {textToShow}
          {!fullPostPage ? (
            <a href={`/post/${obj._id}`} className={styles.cardLink}>
              {" "}
              læs mere...
            </a>
          ) : (
            ""
          )}
        </p>

        <div className={styles.btns}>
          <button onClick={likefn}>
            <FaHeart />
            {obj.likes} likes
          </button>
          <a href={`/post/${obj._id}#commentsection`}>
            <FaComment />
            {obj.comments.length} kommentarer
          </a>
        </div>

        <div className={styles.cat}>
          {obj.category.map((element, index) => {
            return <p key={index}>{element}</p>;
          })}
        </div>
      </div>
    </article>
  );
}

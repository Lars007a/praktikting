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
import { useLocalStorage } from "@uidotdev/usehooks";

export default function Card({
  obj, //Objektet der skal vises.
  updateFunc, //Funktion til at refetche data, når vi laver ændringer.
  changeBcColor = true, //styling
  fullPostPage = false, //Hvis det er individual post siden, default er false.
}) {
  //Komponent til cards'ne der bliver vist på forsiden og på de invidiuelle sider.

  const sendDataObj = useSendData(); //Bruges til at sende data.

  const [likesList, setLikesList] = useLocalStorage("likesList", []);

  //Formater datoen der skal vises.
  const dateToShow = new Date(obj.date)
    .toLocaleString("da-dk", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .replaceAll(".", "/");

  //Teksten der skal vises. Skal nemlig ikke være for lang.
  const [textToShow, setTextToShow] = useState(obj.text);

  //Vi minimere teksten der skal vises, hvis det er nødvendig.
  useState(() => {
    if (!fullPostPage && obj.text.length >= 200) {
      //Tjeker om individuel side, og om teksten er for stor.
      let newText;

      newText = obj.text //tager obj.text
        .slice(0, 200) //tager karakter 0 til 200 i obj.text
        .trimEnd() //fjerner sidste mellemrum hvis det er der i den returnerede tekst (karakter 0 til 200 fra obj.text)
        .slice(0, obj.text.slice(0, 200).trimEnd().lastIndexOf(" ")); //tager så den tekst, og tager første karakter derfra, og fjerner indtil det sidste mellemrum i samme tekst, for at få det til at være et helt ord.

      setTextToShow(newText);
    } else {
      setTextToShow(obj.text);
    }
  }, [obj.text]);

  //Funktion til at like post.
  const likefn = async () => {
    if (likesList.includes(obj._id)) {
      try {
        const result = await sendDataObj.removeLike(obj._id);
        if (result.status == "ok") {
          toast.success("Success! Like fjernet!");
          setLikesList(likesList.filter((e) => e != obj._id));
          updateFunc();
        } else {
          throw new Error("Skete en fejl, prøv igen: " + result.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
      return;
    }

    //tilføj like.
    try {
      const result = await sendDataObj.addLike(obj._id);
      if (result.status == "ok") {
        toast.success("Success! Like tilføjet!");
        setLikesList([...likesList, obj._id]);
        updateFunc();
      } else {
        throw new Error("Skete en fejl, prøv igen: " + result.message);
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

        <div className={styles.top}>
            <h3>{obj.title}</h3>
            <h3>{dateToShow}</h3>
        </div>

      <div className={styles.textContent}>
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
      </div>

        <div className={styles.bottom}>

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

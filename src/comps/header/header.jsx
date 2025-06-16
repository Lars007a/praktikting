import styles from "./header.module.css";
import Searchbox from "../searchbox/searchbox.jsx";
import standardpic from "../../assets/standard.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function header({
  img = [standardpic],
  frontpage = false,
  title = "",
}) {
  return (
    <header className={styles.header}>
      <Swiper
        spaceBetween={1}
        slidesPerView={1}
        navigation
        modules={[Navigation]}
        className={styles.sliderWrapper}
      >
        {img.map((element, index) => {
          return (
            <SwiperSlide key={index} className={styles.slide}>
              <div style={{ backgroundImage: `url(${element})` }}>
                <h1>{title}</h1>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </header>
  );
}

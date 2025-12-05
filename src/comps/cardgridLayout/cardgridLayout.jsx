import styles from "./cardgridLayout.module.css";
import Title from "../titleWithLine/titleWithLine.jsx";
import Card from "../card/card.jsx";
import { useGetData } from "../../hooks/usePosts.jsx";
import LoadingSpinner from "../loadingSpinner/loadingSpinner.jsx";
import ErrorBox from "../errorBox/errorBox.jsx";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import Searchbox from "../searchbox/searchbox.jsx";

export default function cardgrid() {
  const postObj = useGetData(`posts`); //Henter blog indlægene, fra endpointet /posts.

  //Arbejder ud fra denne, fordi eventuelle søgeresultater ville være i denne array.
  //Array der holder alle dem der matcher filteret/søgekriteriene,
  //såsom søgeord, kategori, likes, osv, osv.
  const [filteredArray, setFilteredArray] = useState([]);

  const postPerPage = 10; //Hvor mange der skal vises på siden.
  const [currentPage, setCurrentPage] = useState(0); //Nuværende side der vises.

  //Når man klikker på at skifte side i bunden af siden.
  //Bare ændre den nuværende side, og scroller til toppen med en smooth transition.
  const handleClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behaviour: "smooth" });
  };

  useEffect(() => {
    //Sætter filteredarray, når postObj.data kommer ind, og bliver loadet.
    //Så den som udgangspunkt er alt data.
    if (postObj.data) {
      setFilteredArray(postObj.data);
    }
  }, [postObj.data]);

  //posts variable/array holder de elementer der vises på nuværende side, der bliver vist nu.
  const posts = filteredArray.slice(
    //Tag dem der matcher søgekriterne og tag en del af arrayen.
    //Fra:
    currentPage * postPerPage, //den nuværende side * hvor mange der vises pr side, 0*10 = 0
    (currentPage + 1) * postPerPage //den nuværende side + 1 * hvor mange der vises pr side. (0 + 1) * 10 = 10.
  );

  return (
    <section className={styles.cardgrid}>
      <div className="container">
        <div className={styles.content}>
          {/* element der filtrere filteredArray, og gør sådan
          at den er baseret på brugerens søgekriterne.

          Får funktionen til at sætte filteredarray, ændre siden (til at gå tilbage til side 1),
           og alt data til at arbejde ud fra.
          */}
            <Searchbox
              setData={setFilteredArray}
              changePage={setCurrentPage}
              allData={postObj?.data}
            />
{/*           {postObj.data && (
          )} */}

          <Title title={"Blog indlæg"} />

          {postObj.loading && (
            <div className={styles.box}>
              <LoadingSpinner />
            </div>
          )}
          {postObj.error && (
            <div className={styles.box}>
              <ErrorBox msg={postObj.error} />
            </div>
          )}
          <div className={styles.grid}>
            {postObj.data && (
              <>
                {posts.length > 0 ? (
                  posts.map((element) => {
                    return (
                      <Card
                        obj={element}
                        key={element._id}
                        updateFunc={postObj.get}
                      />
                    );
                  })
                ) : (
                  <p className={styles.notfound}>Ingen posts/indlæg!</p>
                )}
              </>
            )}
          </div>
          {postObj.data &&
            <ReactPaginate
              previousLabel={<MdNavigateBefore />} /* ikon til at skifte side */
              nextLabel={<MdNavigateNext />} /* ikon til at skifte side */
              pageCount={Math.ceil(
                (filteredArray?.length || 0) / postPerPage
              )} /* for at få hvor mange sider
              der skal vises i bunden, rund op for arrayen der matcher søgekriterne, og dens længde
              divideret med hvor mange posts der vises pr side.
              */
              onPageChange={handleClick}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
            />
          }
        </div>
      </div>
    </section>
  );
}

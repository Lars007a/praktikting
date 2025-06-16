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
  const postObj = useGetData(`posts`);

  //Arbejder ud fra denne, fordi eventuelle søgeresultater ville være i denne array.
  const [filteredArray, setFilteredArray] = useState([]); //Array der holder alle dem der matcher filteret, såsom søgning, kategori, likes, osv, osv.

  const postPerPage = 10; //Hvor mange der skal vises på siden.
  const [currentPage, setCurrentPage] = useState(0); //Nuværende side.

  //Når man klikker på at skifte side i bunden.
  const handleClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behaviour: "smooth" });
  }; //Bare ændre den nuværende side, og scroller til toppen med en smooth transition.

  useEffect(() => {
    //Sætter filteredarray, når postObj.data kommer ind, og bliver loadet.
    //Så den som udgangspunkt er alt data.
    if (postObj.data) {
      setFilteredArray(postObj.data);
    }
  }, [postObj.data]);

  const posts = filteredArray.slice(
    currentPage * postPerPage, //få offset, 0 * 10 = 0, 1 * 10 = 10, 2 * 10 = 20,
    (currentPage + 1) * postPerPage //få hvor meget den skal op til, så 0+1 * 10 = 10, 1+1 * 10 = 20, 1+2 * 10 = 30, 1+3 * 10 = 40.
  ); //array, der holder dem der skal vises på den nuværende side.

  return (
    <section className={styles.cardgrid}>
      <div className="container">
        <div className={styles.content}>
          <Searchbox
            setData={setFilteredArray}
            changePage={setCurrentPage}
            allData={postObj.data}
          />

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
          {
            <ReactPaginate
              previousLabel={<MdNavigateBefore />}
              nextLabel={<MdNavigateNext />}
              pageCount={Math.ceil((filteredArray?.length || 0) / postPerPage)}
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

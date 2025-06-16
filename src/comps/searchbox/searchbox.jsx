import styles from "./searchbox.module.css";
import Title from "../titleWithLine/titleWithLine";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function searchbox({ setData, allData = [] }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("Kom ind!");

    if (allData == undefined || allData == null) return;

    let tempArray = [];

    for (let i = 0; i < allData.length; i++) {
      if (allData[i].category == null || allData[i].category == undefined)
        continue;

      for (let y = 0; y < allData[i].category.length; y++) {
        if (tempArray.includes(allData[i].category[y])) {
          continue;
        }
        tempArray.push(allData[i].category[y]);
      }
    }
    //Kun opdater hvis den har ændrede sig.
    setCategories((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(tempArray)) return prev;
      return tempArray;
    });
  }, [allData]);

  const selectRef = useRef(null);
  const searchRef = useRef(null);
  const orderRef = useRef(null);

  const submitForm = (event) => {
    event.preventDefault();
    const selectedEl = selectRef.current.value;
    const searchTerm = searchRef.current.value.toLowerCase().trimEnd();
    const orderEl = orderRef.current.value;

    if (selectedEl == "choose" || orderEl == "default") {
      //choose er default.
      toast.error("Udfyld felterne!");
      return;
    }

    //tag filteredarray, og filter den baseret på fulde array, som vi også skal have ind som et prop...
    const newArray = allData.filter((element, index) => {
      if (
        element.title.toLowerCase().includes(searchTerm) &&
        selectedEl != "choose" &&
        selectedEl != "all" &&
        element.category.includes(selectedEl)
      ) {
        return true;
      } else if (
        (selectedEl == "choose" || selectedEl == "all") &&
        element.title.toLowerCase().includes(searchTerm)
      ) {
        return true;
      }
      return false;
    });

    //Sort array.

    if (orderEl == "alph") {
      newArray.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
    }

    if (orderEl == "new") {
      newArray.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }

    if (orderEl == "likes") {
      newArray.sort((a, b) => {
        return b.likes - a.likes;
      });
    }

    if (orderEl == "comments") {
      newArray.sort((a, b) => {
        return b.comments.length - a.comments.length;
      });
    }

    console.log(newArray.length);

    setData(newArray);
  };

  return (
    <div className={styles.con}>
      <div className={styles.searchBox}>
        <Title title={"Søg"} />
        <form onSubmit={submitForm}>
          <div className={styles.inputsform}>
            <input
              type="text"
              placeholder="Søg..."
              name="search"
              ref={searchRef}
            />
            <div className={styles.opts}>
              <select name="category" defaultValue={"choose"} ref={selectRef}>
                <option value="choose" disabled>
                  Vælg kategori
                </option>
                <option value="all">Alle</option>
                {categories.map((element, index) => {
                  return (
                    <option value={`${element}`} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select ref={orderRef} name="order" defaultValue={"default"}>
                <option value="default" disabled>
                  Sortering
                </option>
                <option value="new">Nyeste</option>
                <option value="alph">Alfabetisk</option>
                <option value="likes">Likes</option>
                <option value="comments">Kommentar</option>
              </select>
            </div>
          </div>
          <div className={styles.smallgray}></div>
          <input type="submit" className={styles.searchBtn} value={"Søg"} />
        </form>
      </div>
    </div>
  );
}

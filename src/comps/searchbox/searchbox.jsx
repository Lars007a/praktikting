import styles from "./searchbox.module.css";
import Title from "../titleWithLine/titleWithLine";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function searchbox({ data = [], setData }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("Kom ind!");

    if (data == undefined || data == null) return;

    let tempArray = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].category == null || data[i].category == undefined) continue;

      for (let y = 0; y < data[i].category.length; y++) {
        if (tempArray.includes(data[i].category[y])) {
          continue;
        }
        tempArray.push(data[i].category[y]);
      }
    }
    //Kun opdater hvis den har ændrede sig.
    setCategories((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(tempArray)) return prev;
      return tempArray;
    });
  }, [data]);

  const selectRef = useRef(null);
  const searchRef = useRef(null);

  const submitForm = (event) => {
    event.preventDefault();
    const selectedEl = selectRef.current.value;
    const searchTerm = searchRef.current.value.toLowerCase().trimEnd();

    if (selectedEl == "choose" || !searchTerm) {
      //choose er default.
      toast.error("Udfyld felterne!");
      return;
    }

    //tag filteredarray, og filter den baseret på fulde array, som vi også skal have ind som et prop...
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
          </div>
          <div className={styles.smallgray}></div>
          <input type="submit" className={styles.searchBtn} value={"Søg"} />
        </form>
      </div>
    </div>
  );
}

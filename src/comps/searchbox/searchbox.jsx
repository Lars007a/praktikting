import styles from "./searchbox.module.css";
import Title from "../titleWithLine/titleWithLine";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function searchbox({ setData, allData = [], changePage }) {
  //State variable til at holde alle kategorierne der er indlæg med.
  const [categories, setCategories] = useState([]);

  //Når alt data kommer ind, så begynd at sætte kategorierne.
  useEffect(() => {
    let tempArray = []; //Array til at holde på kategorierne midlertidligt.
    //For hvert element i data arrayen, looper vi over kategori arrayen inde i,
    //eftersom hvert element i data arrayen, her deres egen kategori array.
    for (let i = 0; i < allData.length; i++) {
      for (let y = 0; y < allData[i].category.length; y++) {
        if (tempArray.includes(allData[i].category[y])) {
          continue; //Hvis vi allerede har tilføet denne kategori string, så gå videre til næste loop.
        }
        tempArray.push(allData[i].category[y]); //ellers så tilføj elementet.
      }
    }

    //Opdater kategorierne der er gemt.
    setCategories((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(tempArray)) return prev;
      return tempArray;
    });
  }, [allData]);

  //Søgnings form.
  const selectRef = useRef(null);
  const searchRef = useRef(null);
  const orderRef = useRef(null);

  const submitForm = (event) => {
    event.preventDefault(); //Så vi kan ændre tingene selv.

    //De tre værdier vi bruger, hvilken kategori, søgetermet, og rækkefølgen det skal sorteres i.
    const selectedEl = selectRef.current.value;
    const searchTerm = searchRef.current.value.toLowerCase().trimEnd();
    const orderEl = orderRef.current.value;

    //Hvis værdierne i select inputs'ne er på default.
    if (selectedEl == "choose" || orderEl == "default") {
      //choose er default.
      toast.error("Udfyld felterne!");
      return;
    }

    //tag filteredarray, og sæt den baseret på den fulde array,
    //og de elementer deri, der passer til søgekriterierne.

    //Hvilket bliver gjort ved at lave en temparray, der så bliver filtreret, og derefter sorteret.
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

    //Sort array ifølge søgekriterierne.

    if (orderEl == "alph") {
      //alph for alfabetisk.
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

    //Sæt arrayen til den state variable i parrent component.
    setData(newArray);
    changePage(0); //skifte side til den første side.
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
              className="stdInput"
            />
            <div className={styles.opts}>
              <select name="category" defaultValue={"choose"} ref={selectRef}>
                <option value="choose" disabled>
                  Vælg kategori
                </option>
                <option value="all">Alle</option>
                {/* I kategori select, loop over alle muligheder vi har fudnet, og vis dem. */}
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
          <input type="submit" className="stdInputBtn" value={"Søg"} />
        </form>
      </div>
    </div>
  );
}

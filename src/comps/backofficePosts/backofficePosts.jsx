import styles from "./backofficePosts.module.css";
import Title from "../titleWithLine/titleWithLine";
import BackofficePopup from "../backofficePopup/backofficePopup.jsx";
import AddPostForm from "../addPostForm/addPostForm.jsx";
import { useState } from "react";
import BackofficeEditPost from "../backofficeEditPost/backofficeEditPost.jsx";
import BackofficeSeeComments from "../backofficeSeeComments/backofficeSeeComments.jsx";

export default function BackofficePosts({ data = [], changePage }) {
  //Array for at holde på forkortede tekster, så at vi ikke bare har en 1000 ords streng i vores table.
  let shortenedText = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].text.length >= 200) {
      let newText;

      newText =
        data[i].text //tager obj.text
          .slice(0, 197) //tager karakter 0 til 200 i obj.text
          .trimEnd() //fjerner sidste mellemrum hvis det er der i den returnerede tekst (karakter 0 til 200 fra obj.text)
          .slice(0, data[i].text.slice(0, 197).trimEnd().lastIndexOf(" ")) +
        "..."; //tager så den tekst, og tager første karakter derfra, og fjerner indtil det sidste mellemrum i samme tekst, for at få det til at være et helt ord.

      shortenedText.push(newText);
    } else {
      shortenedText.push(data[i].text);
    }
  }

  const [openAddPost, setOpenAddPost] = useState(false);
  const [openSeeComments, setOpenSeeComments] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);

  return (
    <>
      <Title black={true} title={"Alle indlæg"} />
      <button
        className={styles.btn}
        onClick={() => {
          setOpenAddPost(true);
        }}
      >
        Tilføj post
      </button>
      <div className={styles.tablecon}>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>date</th>
              <th>text</th>
              <th>likes</th>
              <th>category</th>
              <th>Kommentar</th>
              <th>Ændre</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td>{element._id}</td>
                    <td>{element.title}</td>
                    <td>{element.date}</td>
                    <td>{shortenedText[index]}</td>
                    <td>{element.likes}</td>
                    <td>{element.category.toString()}</td>
                    <td>
                      <button
                        className={styles.btn}
                        onClick={() => {
                          setOpenSeeComments({
                            id: element._id,
                            coms: element.comments,
                          });
                        }}
                      >
                        Kommentar
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.btn}
                        onClick={() => {
                          setOpenEditPost(element);
                        }}
                      >
                        Ændre
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {openAddPost ? (
        <BackofficePopup
          closeFunc={() => {
            setOpenAddPost(false);
          }}
          maincontent={<AddPostForm />}
          colorClassTop={styles.colorchange}
          title={"Lav nyt indlæg"}
        />
      ) : (
        ""
      )}

      {openEditPost ? (
        <BackofficePopup
          closeFunc={() => {
            setOpenEditPost(false);
          }}
          maincontent={<BackofficeEditPost obj={openEditPost} />}
          colorClassTop={styles.colorchange}
          title={`Ændre indlæg for ${openEditPost._id}`}
        />
      ) : (
        ""
      )}

      {openSeeComments ? (
        <BackofficePopup
          closeFunc={() => {
            setOpenSeeComments(false);
          }}
          maincontent={<BackofficeSeeComments coms={openSeeComments.coms} />}
          colorClassTop={styles.colorchange}
          title={`Se komentarer for ${openSeeComments.id}`}
        />
      ) : (
        ""
      )}
    </>
  );
}

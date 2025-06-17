import styles from "./backofficePosts.module.css";
import Title from "../titleWithLine/titleWithLine";
import BackofficePopup from "../backofficePopup/backofficePopup.jsx";
import AddPostForm from "../addPostForm/addPostForm.jsx";
import { useEffect, useState } from "react";
import BackofficeEditPost from "../backofficeEditPost/backofficeEditPost.jsx";
import BackofficeSeeComments from "../backofficeSeeComments/backofficeSeeComments.jsx";
import { useSendData, useGetData } from "../../hooks/usePosts.jsx";
import { toast } from "react-toastify";

export default function BackofficePosts({}) {
  const sendData = useSendData(); //hook til at sende data til api'en.
  const postObj = useGetData("posts"); //hook til at få data fra /posts endpoint.

  //Array for at holde på forkortede tekster, så at vi ikke bare har en 1000 ords streng i vores table.
  let shortenedText = [];
  useEffect(() => {
    if (postObj.data == null) return;

    //Loop over alle elementerne der vises,
    //tjek størelsen på teksten, hvis den er for stor, forkort den, hvis ikke for stor, behold den
    //som den er.
    for (let i = 0; i < postObj.data.length; i++) {
      if (postObj.data[i].text.length >= 200) {
        let newText;

        newText =
          postObj.data[i].text //tager obj.text
            .slice(0, 197) //tager karakter 0 til 197 i obj.text
            .trimEnd() //fjerner sidste mellemrum hvis det er der i den returnerede tekst (karakter 0 til 197 fra obj.text)
            .slice(
              0,
              postObj.data[i].text.slice(0, 197).trimEnd().lastIndexOf(" ")
            ) + "..."; //tager så den tekst, og tager første karakter derfra, og fjerner indtil det sidste mellemrum i samme tekst, for at få det til at være et helt ord.

        shortenedText.push(newText);
      } else {
        shortenedText.push(postObj.data[i].text);
      }
    }
  }, [postObj.data]);

  //State variabler til at holde på om vi skal have popup'sne oppe.
  const [openAddPost, setOpenAddPost] = useState(null);
  const [openSeeComments, setOpenSeeComments] = useState(null);
  const [openEditPost, setOpenEditPost] = useState(null);

  //Funktion til at delete et post.
  const deletePost = (idToDel) => {
    //Brug en funktion der blev retuneret fra hook'et.
    sendData
      .deletePost(idToDel)
      .then((val) => {
        if (val.status == "ok") {
          //hvis success.
          toast.success("Slettede indlæg!");
          postObj?.get();
        } else {
          throw new Error("Kunne ikke slette indlæg: " + val.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Title title={"Alle indlæg"} />
      <button
        className={styles.btn}
        onClick={() => {
          setOpenAddPost(true); //Åben popup med tilføj post.
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
              <th>Slet</th>
            </tr>
          </thead>
          <tbody>
            {postObj.data &&
              postObj.data.map((element, index) => {
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
                          setOpenSeeComments(element._id); //Åben popup med comments, for dette id.
                        }}
                      >
                        Kommentar
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.btn}
                        onClick={() => {
                          setOpenEditPost(element); //Åben popup med ændre dette element.
                        }}
                      >
                        Ændre
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.btn}
                        onClick={() => {
                          deletePost(element._id); //Delete dette post med dette id.
                        }}
                      >
                        Slet
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
            setOpenAddPost(null); //bare sæt state til null, for at fjerne popup'en.
          }}
          maincontent={<AddPostForm updateFunc={postObj?.get} />} //Skal have update func, til at kunne opdater tabelen.
          title={"Lav nyt indlæg"}
        />
      ) : (
        ""
      )}

      {openEditPost ? (
        <BackofficePopup
          closeFunc={() => {
            setOpenEditPost(null); //bare sæt state til null, for at fjerne popup'en.
          }}
          maincontent={
            <BackofficeEditPost obj={openEditPost} updateFunc={postObj?.get} /> //Skal have update func, til at kunne opdater tabelen.
            //state variablen sig selv er elementet der skal opdateres, så id'et og default values til formen kan bruges i popupen.
          }
          title={`Ændre indlæg for ${openEditPost._id}`}
        />
      ) : (
        ""
      )}

      {openSeeComments ? (
        <BackofficePopup
          closeFunc={() => {
            setOpenSeeComments(null); //bare sæt state til null, for at fjerne popup'en.
          }}
          maincontent={<BackofficeSeeComments post={openSeeComments} />} //Open see comments state
          // variablen er id'et på den der skal åbnes, så den kan finde kommentarne på elementet.
          title={`Se komentarer for ${openSeeComments}`}
        />
      ) : (
        ""
      )}
    </>
  );
}

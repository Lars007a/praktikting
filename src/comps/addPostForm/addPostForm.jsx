import styles from "./addPostForm.module.css";
import { useSendData } from "../../hooks/usePosts.jsx";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function addPostForm({ updateFunc }) {
  const useSend = useSendData(); //hook med funktioner til at sende data til api.

  const formRef = useRef(null); //form med inputs.

  const submit = (event) => {
    event.preventDefault(); //så vi styre hvad der sker.
    const formData = new FormData(formRef.current); //Formdata, til at submitte.

    //Gør category fra string til array igen.
    const objOfData = Object.fromEntries(formData.entries()); //tager og konverter data inputtet til et object.
    const categoryArray = objOfData.category.split(","); //konverter category field ind til en array, splittet ved hvert ","/komma.
    formData.set("category", JSON.stringify(categoryArray));

    useSend
      .addPost(formData)
      .then((val) => {
        if (val.status == "ok") {
          toast.success(val.message);
          updateFunc();
        } else {
          throw new Error(val.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <form onSubmit={submit} ref={formRef} className={styles.form}>
      <input
        type="text"
        name="title"
        placeholder="Titel..."
        className="stdInput"
      />
      <textarea name="text" placeholder="Tekst..." className="stdInput" />
      <input
        type="text"
        name="category"
        placeholder="Kategorier..."
        className="stdInput"
      />
      <div>
        <input type="file" name="image" id="image" multiple />
      </div>
      <input type="submit" value={"Send"} className="stdInputBtn" />
    </form>
  );
}

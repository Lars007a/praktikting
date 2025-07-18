import { useRef } from "react";
import styles from "./backofficeEditPost.module.css";
import { useSendData } from "../../hooks/usePosts.jsx";
import { toast } from "react-toastify";

export default function backofficeEditPost({ obj, updateFunc }) {
  const useSend = useSendData(); //Send data til api'en hook.

  const formRef = useRef(null);

  const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current); //Formdata, til at submitte.

    //Gør category fra string til array igen.
    const objOfData = Object.fromEntries(formData.entries()); //tager og konverter data inputtet til et object.
    const categoryArray = objOfData.category.split(","); //tager og konverter kategory til en array splittet på ",".
    formData.set("category", JSON.stringify(categoryArray)); //sætter den nye kategory array, formatteret som JSON,
    //  til det der skal sendes med formen

    useSend //bruger funktionen returneret fra hook'et.
      .updatePost(formData, obj._id)
      .then((val) => {
        if (val.status == "ok") {
          //hvis success.
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
    <form onSubmit={submit} className={styles.form} ref={formRef}>
      <input
        type="text"
        name="title"
        placeholder="Titel..."
        className="stdInput"
        defaultValue={obj.title}
      />
      <textarea
        name="text"
        placeholder="Tekst..."
        defaultValue={obj.text}
        className="stdInput"
      />
      <input
        type="text"
        name="category"
        placeholder="Kategorier..."
        className="stdInput"
        defaultValue={obj.category.toString()}
      />
      <div>
        <input type="file" name="image" id="image" multiple />
      </div>
      <input type="submit" value={"Send"} className="stdInputBtn" />
    </form>
  );
}

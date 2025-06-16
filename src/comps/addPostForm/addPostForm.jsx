import styles from "./addPostForm.module.css";

export default function addPostForm() {
  const submit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submit} className={styles.form}>
      <input type="text" name="title" placeholder="Titel..." />
      <textarea name="text" placeholder="Tekst..." />
      <input type="text" name="category" placeholder="Kategorier..." />
      <div>
        <input type="file" name="image" id="image" multiple />
      </div>
      <input type="submit" value={"Send"} />
    </form>
  );
}

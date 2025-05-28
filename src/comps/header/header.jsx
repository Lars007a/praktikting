import styles from "./header.module.css";

export default function header({ img, frontpage = false, title = "" }) {
  return (
    <>
      <header
        className={styles.header}
        style={{ backgroundImage: `url(${img})` }}
      >
        {frontpage ? (
          <div className={styles.con}>
            <div className={styles.searchBox}>
              <h2>Text</h2>
              <div className={styles.smallgray}></div>
              <form>
                <input type="text" placeholder="Søg..." name="search" />
                <select name="category" defaultValue={"choose"}>
                  <option value="choose" disabled>
                    Vælg kategori
                  </option>
                  <option value="all">Alle</option>
                  <option value="ting1">ting1</option>
                  <option value="ting2">ting2</option>
                  <option value="ting3">ting3</option>
                  <option value="ting4">ting4</option>
                  <option value="ting5">ting5</option>
                </select>
              </form>
            </div>
          </div>
        ) : (
          <h1 className={`${styles.notFrontpageText} title`}>{title}</h1>
        )}
      </header>
    </>
  );
}

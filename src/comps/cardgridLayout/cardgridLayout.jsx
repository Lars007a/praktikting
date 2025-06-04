import styles from "./cardgridLayout.module.css";
import Title from "../titleWithLine/titleWithLine.jsx";
import Card from "../card/card.jsx";

export default function cardgrid() {
  return (
    <section className={styles.cardgrid}>
      <div className="container">
        <div className={styles.content}>
          <Title title={"Blog indlæg"} />

          <div className={styles.grid}>
            <Card
              title={"Indlæg 1"}
              likes={10}
              comments={11}
              date={"1. Maj"}
              category={["Hej", "Ting2", "blabla", "sådan!"]}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              }
              changeBcColor={false}
            />
            <Card
              title={"Indlæg 1"}
              likes={10}
              comments={11}
              date={"1. Maj"}
              category={["Hej", "Ting2", "blabla", "sådan!"]}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              }
              changeBcColor={true}
            />
            <Card
              title={"Indlæg 1"}
              likes={10}
              comments={11}
              date={"1. Maj"}
              category={["Hej", "Ting2", "blabla", "sådan!"]}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              }
              changeBcColor={true}
            />
            <Card
              title={"Indlæg 1"}
              likes={10}
              comments={11}
              date={"1. Maj"}
              category={["Hej", "Ting2", "blabla", "sådan!"]}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              }
              changeBcColor={true}
            />
            <Card
              title={"Indlæg 1"}
              likes={10}
              comments={11}
              date={"1. Maj"}
              category={["Hej", "Ting2", "blabla", "sådan!"]}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              }
              changeBcColor={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

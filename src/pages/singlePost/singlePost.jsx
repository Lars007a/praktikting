import styels from "./singlePost.module.css";
import Header from "../../comps/header/header";
import testpic from "../../assets/testpic.jpg";
import Card from "../../comps/card/card.jsx";
import { useParams } from "react-router";
import CommentGrid from "../../comps/commentGrid/commentGrid.jsx";

export default function singlePost() {
  let params = useParams();

  console.log(params, params.postid);

  return (
    <>
      <Header img={testpic} frontpage={false} title="Ting ting" />
      <section className={styels.pageSec}>
        <div className="container">
          <div className={styels.content}>
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
              fullPostPage={true}
            />

            <CommentGrid
              comments={[
                {
                  name: "Navn 1",
                  date: "1. Maj",
                  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                },
                {
                  name: "Navn 2",
                  date: "2. Maj",
                  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                },
                {
                  name: "Navn 3",
                  date: "3. Maj",
                  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                },
                {
                  name: "Navn 3",
                  date: "3. Maj",
                  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}

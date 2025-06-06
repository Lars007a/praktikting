import styles from "./frontpage.module.css";
import Header from "../../comps/header/header";
import testpic from "../../assets/testpic.jpg";
import CardgridLayout from "../../comps/cardgridLayout/cardgridLayout.jsx";

export default function frontpage() {
  return (
    <>
      <Header img={testpic} frontpage={true} />
      <CardgridLayout />
    </>
  );
}

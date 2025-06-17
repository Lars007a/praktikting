import styles from "./frontpage.module.css";
import Header from "../../comps/header/header";
import CardgridLayout from "../../comps/cardgridLayout/cardgridLayout.jsx";

export default function frontpage() {
  //Bare header og cardgrid'en.
  return (
    <>
      <Header frontpage={true} title="Blog" />
      <CardgridLayout />
    </>
  );
}

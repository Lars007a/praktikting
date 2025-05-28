import styels from "./singlePost.module.css";
import Header from "../../comps/header/header";
import testpic from "../../assets/testpic.jpg";

export default function singlePost() {
  return <Header img={testpic} frontpage={false} title="Ting ting" />;
}

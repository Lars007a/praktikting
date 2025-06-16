import styels from "./singlePost.module.css";
import Header from "../../comps/header/header";
import Card from "../../comps/card/card.jsx";
import { useParams } from "react-router";
import CommentGrid from "../../comps/commentGrid/commentGrid.jsx";
import { useGetData } from "../../hooks/usePosts.jsx";
import LoadingSpinner from "../../comps/loadingSpinner/loadingSpinner.jsx";
import ErrorBox from "../../comps/errorBox/errorBox.jsx";
import AddComment from "../../comps/addComment/addComment.jsx";
import Title from "../../comps/titleWithLine/titleWithLine.jsx";
import standardpic from "../../assets/standard.jpg";
import { useEffect } from "react";

export default function SinglePost() {
  let params = useParams();
  const postObj = useGetData(`post/${params.postid}`);

  console.log(postObj.data);

  return (
    <>
      <Header
        img={
          postObj?.data?.img?.length > 0 ? postObj?.data?.img : [standardpic]
        }
        frontpage={false}
        title={postObj.data ? postObj.data.title : "title"}
      />

      <section className={styels.pageSec}>
        <div className="container">
          <div className={styels.content}>
            {postObj.error && <ErrorBox msg={postObj?.error} />}
            {postObj.loading && <LoadingSpinner />}
            {postObj.data && (
              <>
                <Card
                  obj={postObj?.data}
                  fullPostPage={true}
                  updateFunc={postObj?.get}
                  changeBcColor={false}
                />
                <AddComment
                  postid={postObj?.data?._id}
                  updateFunc={postObj?.get}
                />
                <CommentGrid
                  comments={postObj?.data.comments}
                  postid={postObj.data._id}
                  updateFunc={postObj?.get}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

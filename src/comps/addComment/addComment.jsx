import styles from "./addComment.module.css";
import Title from "../titleWithLine/titleWithLine";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import ErrorBox from "../errorBox/errorBox.jsx";
import { useSendData } from "../../hooks/usePosts.jsx";

export default function addComment({ postid, updateFunc }) {
  const sendDataObj = useSendData();

  const schema = yup.object({
    email: yup
      .string()
      .email("Skal være en email!")
      .required("Skal skrive emailen ind..."),
    name: yup.string().required("Skal skrive et navn ind..."),
    text: yup.string().min(10, "Kommentaren skal minimum være på 10 tegn!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    let d = sendDataObj
      .addComment(postid, data.email, data.name, data.text)
      .then((val) => {
        if (val.status == "ok") {
          toast.success("Kommentar tilføjet!");
          updateFunc();
        } else {
          console.log(val);
          throw new Error(val.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
    console.log(d);
  };

  return (
    <>
      <div className={styles.title}>
        <Title title={"Tilføj kommentar"} />
      </div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        id="commentsection"
      >
        <input
          type="email"
          placeholder="Email..."
          className="stdInput"
          {...register("email")}
        />
        <input
          type="text"
          placeholder="Navn..."
          className="stdInput"
          {...register("name")}
        />
        <textarea
          name=""
          placeholder="Kommentar..."
          className="stdInput"
          {...register("text")}
        ></textarea>
        <input type="submit" value={"Send kommentar"} className="stdInputBtn" />
      </form>
      <div className={styles.errorOutput}>
        {errors.email && <ErrorBox msg={errors.email.message} />}

        {errors.name && <ErrorBox msg={errors.name.message} />}

        {errors.text && <ErrorBox msg={errors.text.message} />}
      </div>
    </>
  );
}

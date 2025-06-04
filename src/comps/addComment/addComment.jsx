import styles from "./addComment.module.css";
import Title from "../titleWithLine/titleWithLine";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

export default function addComment() {
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
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <input type="email" placeholder="Email..." {...register("email")} />
        <input type="text" placeholder="Navn..." {...register("name")} />
        <textarea
          name=""
          placeholder="Kommentar..."
          {...register("text")}
        ></textarea>
        <input type="submit" value={"Send kommentar"} />
      </form>
      <div className={styles.errorOutput}>
        {errors.email && (
          <div>
            <p>{errors.email.message}</p>
          </div>
        )}

        {errors.name && (
          <div>
            <p>{errors.name.message}</p>
          </div>
        )}

        {errors.text && (
          <div>
            <p>{errors.text.message}</p>
          </div>
        )}
      </div>
    </>
  );
}

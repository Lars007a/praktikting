import { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

//Kan blive brugt på /post, /posts, osv, osv.
export function useGetData(url) {
  const [loginToken, setLoginToken] = useLocalStorage("login", null); //Til at se om logget ind.

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const get = async () => {
    setLoading(true);

    try {
      const resp = await fetch(`https://praktikting-backend.onrender.com/${url}`, {
        headers: {
          authorization: loginToken?.token ? loginToken.token : "",
        },
      });

      if (!resp.ok) {
        //checker status koden for en "ok" status kode.
        throw new Error("Kunne ikke fetche data.");
      }

      const result = await resp.json();

      setData(result.data); //retunere .data i det json der bliver retuneret.
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get();
  }, [url]);

  return {
    data,
    loading,
    error,
    get,
  };
}

//kan blive brugt på flere sider, bare et eventuelt url (efter host og port), og så data der skal sendes med.
export function useSendData() {
  const [loginToken, setLoginToken] = useLocalStorage("login", null); //Til at se om logget ind.


  function validateToken() {
    return fetch("https://praktikting-backend.onrender.com/auth", {
      method: "GET",
      headers: {
        authorization: loginToken?.token ? loginToken.token : "",
        "Content-Type": "application/json",
      }
    }).then((res) => {
      return res.json();
    })
  }

  const addLike = (id) => {
    return fetch(`https://praktikting-backend.onrender.com/incrementLike/${id}`, {
      method: "PATCH",
    }).then((res) => {
      return res.json();
    });
  };

  function removeLike(id) {
    return fetch(`https://praktikting-backend.onrender.com/decrementLike/${id}`, {
      method: "PATCH",
    }).then((res) => {
      return res.json();
    });
  }

  function addComment(postid, email, name, text) {
    //Retunere et promise, med value, der er formatteret som json.
    return fetch(`https://praktikting-backend.onrender.com/addComment/${postid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        text: text,
      }),
    }).then((res) => {
      return res.json();
    });
  }

  function addUser(email, name, password) {
    //Retunere et promise, med value, der er formatteret som json.
    return fetch(`https://praktikting-backend.onrender.com/addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: loginToken.token,
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
      }),
    }).then((res) => {
      return res.json();
    });
  }

  function deleteUser(id) {
    //Retunere et promise, med value, der er formatteret som json.
    return fetch(`https://praktikting-backend.onrender.com/removeUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: loginToken.token,
      },
    }).then((res) => {
      return res.json();
    });
  }

  function addPost(form) {
    //Retunere et promise, med value, der er formatteret som json.
    return fetch(`https://praktikting-backend.onrender.com/posts/`, {
      method: "POST",
      headers: {
        authorization: loginToken.token,
      },
      body: form,
    }).then((res) => {
      return res.json(); //return promsie med json value til næste.
    });
  }

  function updatePost(form, postid) {
    //Retunere et promise, med value, der er formatteret som json.
    return fetch(`https://praktikting-backend.onrender.com/updatePost/${postid}`, {
      method: "PUT",
      headers: {
        authorization: loginToken.token,
      },
      body: form,
    }).then((res) => {
      return res.json(); //return promsie med json value til næste.
    });
  }

  function deleteComment(postid, commentid) {
    //Retunere et promise, med value, der er formatteret som json.
    return fetch(`https://praktikting-backend.onrender.com/deleteComment/${postid}/${commentid}`, {
      method: "DELETE",
      headers: {
        authorization: loginToken.token,
      },
    }).then((res) => {
      return res.json(); //return promsie med respons i json value  til næste.
    });
  }

  function deletePost(id) {
    //Retunere et promise, med value, der er formatteret som json.
    return fetch(`https://praktikting-backend.onrender.com/post/${id}`, {
      method: "DELETE",
      headers: {
        authorization: loginToken.token,
      },
    }).then((res) => {
      return res.json(); //return promsie med json value til næste.
    });
  }

  function login(email, password) {
    //Retunere et promise, med value, der er formatteret som json.
    return fetch(`https://praktikting-backend.onrender.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      return res.json(); //return promsie med json value til næste.
    });
  }

  function sendRating(rating) {
    //Retunere et promise, med value, der er formatteret som json.
    return fetch(`https://praktikting-backend.onrender.com/sendRating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rating,
      }),
    }).then((res) => {
      return res.json(); //return promsie med json value til næste.
    });
  }

  return {
    addLike,
    addComment,
    addPost,
    updatePost,
    deletePost,
    deleteComment,
    sendRating,
    removeLike,
    login,
    deleteUser,
    addUser,
    validateToken,
  };
}

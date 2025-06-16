import { useState, useEffect } from "react";

//Kan blive brugt på /post, /posts, osv, osv.
export function useGetData(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const get = async () => {
    setLoading(true);

    try {
      const resp = await fetch(`http://localhost:3043/${url}`);

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
  const addLike = (id) => {
    const res = fetch(`http://localhost:3043/incrementLike/${id}`, {
      method: "PATCH",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Respons ikke ok! Prøv igen!");
      }

      return res.json();
    });

    return res;
  };

  function removeLike(id) {}

  function addComment(postid, email, name, text) {
    return fetch(`http://localhost:3043/addComment/${postid}`, {
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

  function addPost(form) {
    return fetch(`http://localhost:3043/posts/`, {
      method: "POST",
      body: form,
    }).then((res) => {
      return res.json(); //return promsie med json value til næste.
    });
  }

  function updatePost(form, postid) {
    return fetch(`http://localhost:3043/updatePost/${postid}`, {
      method: "PUT",
      body: form,
    }).then((res) => {
      return res.json(); //return promsie med json value til næste.
    });
  }

  function deleteComment(postid, commentid) {}

  function deletePost(id) {}

  function sendRating(rating) {}

  return { addLike, addComment, addPost, updatePost };
}

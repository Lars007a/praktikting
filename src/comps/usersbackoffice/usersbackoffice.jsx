import styles from "./usersbackoffice.module.css";
import Title from "../titleWithLine/titleWithLine.jsx";
import { useGetData } from "../../hooks/usePosts.jsx";
import { useSendData } from "../../hooks/usePosts.jsx";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import BackofficePopup from "../backofficePopup/backofficePopup.jsx";

export default function usersbackoffice({}) {
  const useSend = useSendData();
  const useGet = useGetData("getUsers");
  const [openAddUser, setOpenAddUser] = useState(null);

  const deleteAccount = (id) => {
    useSend
      .deleteUser(id)
      .then((val) => {
        if (val.status == "ok") {
          toast.success("Bruger slettet!");
          useGet.get();
        } else {
          throw new Error(val.message);
        }
      })
      .catch((error) => {
        toast.error("Kunne ikke slette bruger: " + error.message);
      });
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const submitAdd = (event) => {
    event.preventDefault();

    if (
      !emailRef.current.value ||
      !passwordRef.current.value ||
      !nameRef.current.value
    ) {
      toast.error("Skal fylde formen ud!");
      return;
    }

    if (!emailRef.current.value.includes("@")) {
      toast.error("Email skal være en email!");
      return;
    }

    useSend
      .addUser(
        emailRef.current.value,
        nameRef.current.value,
        passwordRef.current.value
      )
      .then((val) => {
        if (val.status == "ok") {
          toast.success("Bruger tilføjet!");
          useGet.get();
          return;
        }

        throw new Error(val.message);
      })
      .catch((error) => {
        toast.error("Kunne ikke oprette admin brugeren! " + error.message);
      });
  };

  return (
    <>
      <Title title={"Brugere"} />
      <button
        className={styles.btn}
        onClick={() => {
          setOpenAddUser(true);
        }}
      >
        Tilføj bruger
      </button>
      <div className={styles.tablecon}>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Email</th>
              <th>Navn</th>
              <th>Role</th>
              <th>Slet</th>
            </tr>
          </thead>
          <tbody>
            {useGet.data &&
              useGet.data.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td>{element._id}</td>
                    <td>{element.email}</td>
                    <td>{element.name}</td>
                    <td>{element.role}</td>
                    <td>
                      <button
                        className={styles.btn}
                        onClick={() => {
                          deleteAccount(element._id); //Delete dette post med dette id.
                        }}
                      >
                        Slet
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {openAddUser ? (
        <BackofficePopup
          closeFunc={() => {
            setOpenAddUser(null); //bare sæt state til null, for at fjerne popup'en.
          }}
          maincontent={
            <form onSubmit={submitAdd} className={styles.form} noValidate>
              <input
                type="email"
                ref={emailRef}
                className="stdInput"
                placeholder="Email..."
              />
              <input
                type="text"
                ref={nameRef}
                className="stdInput"
                placeholder="Navn..."
              />
              <input
                type="password"
                className="stdInput"
                placeholder="Password..."
                ref={passwordRef}
              />
              <input type="submit" value={"Send"} className="stdInputBtn" />
            </form>
          } //Open see comments state
          // variablen er id'et på den der skal åbnes, så den kan finde kommentarne på elementet.
          title={`Tilføj ny admin bruger!`}
        />
      ) : (
        ""
      )}
    </>
  );
}

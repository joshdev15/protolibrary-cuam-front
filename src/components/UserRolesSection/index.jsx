import { useContext, useState } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { Input } from "components/FormComponents";
import styles from "./styles.module.scss";

const UserRolesSection = () => {
  const [value, setValue] = useState();
  const { users, getUserByEmail, updateRole } = useContext(FirebaseContext);

  const searchEmail = (e) => {
    e.preventDefault();
    getUserByEmail(value);
  };

  return (
    <>
      <form onSubmit={searchEmail}>
        <Input
          type="text"
          label="Correo del Usuario"
          onChange={(e) => setValue(e.target.value)}
        />
        <Input type={"submit"} style={{ display: "none" }} />
      </form>

      {users?.length !== 0 && (
        <div className={styles.userContainer}>
          {users.length > 0 &&
            users.map(({ email, role, uid }, index) => (
              <div key={index} className={styles.userLine}>
                <strong>{email}</strong>

                {role === "student" && (
                  <button
                    className={styles.button}
                    onClick={() => updateRole(uid, "archivist")}
                  >
                    Promover a Archivista
                  </button>
                )}

                {role === "archivist" && (
                  <button
                    className={styles.button}
                    onClick={() => updateRole(uid, "student")}
                  >
                    Degradar a Alumno
                  </button>
                )}

                {role === "admin" && <div>Opción deshabilitada</div>}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default UserRolesSection;

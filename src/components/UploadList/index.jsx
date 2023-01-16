import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import styles from "./styles.module.scss";

const UploadList = () => {
  // const {} = useContext(FirebaseContext);

  useEffect(() => {
    console.log("cargando");
  }, []);

  return (
    <div className={styles.container}>
      <div
        id="uploadform"
        className={styles.subcontainer}
        onSubmit={(e) => onSubmit(e)}
      >
        <div className={styles.info}>
          <h3>
            Lista de solicitudes para subir un Nuevo Documento a la biblioteca
          </h3>
          <p>
            En esta seccion, si eres administrador, puedes aprobar la adicion de
            un nuevo documento a la biblioteca, por otro lado, si eres
            archivista solo tienes permiso de ver las solicitudes que se
            encuentran a la espera.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadList;

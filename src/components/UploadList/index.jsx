import { useContext, useEffect } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import DownloadImage from "assets/down.png";
import ReloadImage from "assets/reload.png";
import CheckImage from "assets/check.png";
import TrashImage from "assets/trash.png";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.scss";

const UploadList = () => {
  const { user, getWaitingRequest, wRequests, approveRequest, rejectRequest } =
    useContext(FirebaseContext);

  const downloadFile = (url) => {
    console.log("opening");
    window.open(url);
  };

  const reloadRequests = () => {
    console.log("reloading");
    getWaitingRequest();
  };

  useEffect(() => {
    console.log("cargando");
    getWaitingRequest();
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

          <p style={{ color: "red", fontWeight: 600 }}>
            Por favor, revise bien el documento antes de aprobar, recuerde que
            luego será accesible para todos.
          </p>
        </div>

        <div className={styles.requests}>
          <div className={styles.requestLine}>
            <div onClick={reloadRequests}>
              <img
                className={styles.down}
                src={ReloadImage}
                alt={"Reload"}
                width={20}
                height={20}
              />
            </div>
          </div>

          {wRequests.length > 0 &&
            wRequests.map(
              ({ userEmail, documentObject, requestId, status }) => (
                <div className={styles.requestLine} key={documentObject.keyId}>
                  <div className={styles.item}>
                    <strong>Email</strong>
                    <p>{userEmail}</p>
                  </div>

                  <div className={styles.item}>
                    <strong>Nombre del documento</strong>
                    <p>{documentObject.name}</p>
                  </div>

                  <div className={styles.item}>
                    <strong>Id de la Categoría </strong>
                    <p>{documentObject.categoryId}</p>
                  </div>

                  <div className={styles.item}>
                    <strong>Año del Documento</strong>
                    <p>{documentObject.year}</p>
                  </div>

                  <div className={styles.item}>
                    <strong>Estado de la solicitud</strong>
                    <p>En espera...</p>
                  </div>

                  {["admin", "archivist"].includes(user.role) && (
                    <div onClick={() => downloadFile(documentObject.url)}>
                      <Tooltip anchorId={`down${requestId}`}>
                        Ver el documento
                      </Tooltip>

                      <img
                        id={`down${requestId}`}
                        className={styles.down}
                        src={DownloadImage}
                        alt={"Download"}
                        width={20}
                        height={20}
                      />
                    </div>
                  )}

                  {["admin"].includes(user.role) && (
                    <div onClick={() => approveRequest(requestId)}>
                      <Tooltip anchorId={`approve${requestId}`}>
                        Aprobar
                      </Tooltip>

                      <img
                        id={`approve${requestId}`}
                        className={styles.down}
                        src={CheckImage}
                        alt={"Download"}
                        width={20}
                        height={20}
                      />
                    </div>
                  )}

                  {["admin"].includes(user.role) && (
                    <div onClick={() => rejectRequest(requestId)}>
                      <Tooltip anchorId={`reject${requestId}`}>
                        Rechazar
                      </Tooltip>

                      <img
                        id={`reject${requestId}`}
                        className={styles.down}
                        src={TrashImage}
                        alt={"Download"}
                        width={20}
                        height={20}
                      />
                    </div>
                  )}
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default UploadList;

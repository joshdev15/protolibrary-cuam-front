import { useContext } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import PropTypes from "prop-types";
import EmptyImage from "assets/empty.png";
import DownloadImage from "assets/down.png";
import CloseImage from "assets/close.png";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.scss";

const BookCard = ({ item }) => {
  const { user, deleteFileAndDocument } = useContext(FirebaseContext);
  const { name, author, image, url, year, keyId, owner } = item;

  const downloadFile = () => {
    window.open(url);
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={image !== undefined ? styles.image : styles.noimage}>
          <div className={styles.down} onClick={downloadFile}>
            <Tooltip anchorId={`dl${keyId}`}>Descargar</Tooltip>
            <img
              id={`dl${keyId}`}
              src={DownloadImage}
              alt={"Download"}
              width={20}
              height={20}
            />
          </div>

          {user !== undefined &&
            ["archivist", "admin"].includes(user?.role) &&
            owner !== "CUAM" && (
              <div
                className={styles.rm}
                onClick={() => deleteFileAndDocument(keyId)}
              >
                <Tooltip anchorId={`rm${keyId}`}>Eliminar</Tooltip>
                <img
                  id={`rm${keyId}`}
                  src={CloseImage}
                  alt={"Download"}
                  width={20}
                  height={20}
                />
              </div>
            )}

          {image !== undefined ? (
            <img src={image} alt={"Document"} />
          ) : (
            <img src={EmptyImage} alt={"Document"} />
          )}
        </div>
        <h1>{name}</h1>
        <h2>{author}</h2>
        <h2>{owner}</h2>
        <h3>{year}</h3>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    author: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    year: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    isPublic: PropTypes.bool,
  }),
};

export default BookCard;

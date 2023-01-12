import PropTypes from "prop-types";
import EmptyImage from "assets/empty.png";
import DownloadImage from "assets/down.png";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.scss";

const BookCard = ({ item }) => {
  const { name, author, image, url, year, keyId } = item;

  const downloadFile = () => {
    window.open(url);
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={image !== undefined ? styles.image : styles.noimage}>
          <div className={styles.down} onClick={downloadFile}>
            <Tooltip
              anchorId={keyId}
              data-tooltip-content="Click para descargar"
              data-tooltip-delay-hide={1000}
            >
              Descargar
            </Tooltip>
            <img
              id={keyId}
              src={DownloadImage}
              alt={"Download"}
              width={20}
              height={20}
            />
          </div>
          {image !== undefined ? (
            <img src={image} alt={"Document"} />
          ) : (
            <img src={EmptyImage} alt={"Document"} />
          )}
        </div>
        <h1>{name}</h1>
        <h2>{author}</h2>
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

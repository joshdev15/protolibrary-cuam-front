import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { File, Input } from "components/FormComponents";
import styles from "./styles.module.scss";
import LottiePlayer from "components/Lottie";
import Loader from "assets/loader.json";

const MyFilesSection = () => {
  const { privateF, getPrivateFiles, setPrivateFiles } =
    useContext(FirebaseContext);
  const [loading, setLoader] = useState(false);
  const [values, setValues] = useState({
    cedula: { value: "" },
    opsu: { value: "" },
  });

  const [exists, setExists] = useState({
    cedula: { exist: false },
    opsu: { exist: false },
  });

  const setValue = (value, key) => {
    const copy = { ...values };
    copy[key].value = value;
    setValues(copy);
  };

  useEffect(() => {
    getPrivateFiles();
  }, []);

  useEffect(() => {
    const copy = { ...exists };
    const cedula = privateF.find((item) => item.is === "cedula");
    if (cedula !== undefined) {
      copy.cedula.exist = true;
    }

    const opsu = privateF.find((item) => item.is === "opsu");
    if (opsu !== undefined) {
      copy.opsu.exist = true;
    }

    setExists(copy);
    setLoader(false);
  }, [privateF]);

  const onSubmit = (name) => {
    setLoader(true);
    if (name === "cedula" && values.cedula.value !== undefined) {
      setPrivateFiles(values.cedula.value, "cedula");
    }

    if (name === "opsu" && values.opsu.value !== undefined) {
      setPrivateFiles(values.opsu.value, "opsu");
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.item} ${
          exists.cedula.exist ? styles.green : styles.orange
        }`}
      >
        <h3>Cédula de Identidad</h3>

        {loading ? (
          <LottiePlayer src={Loader} width={100} height={100} />
        ) : (
          <>
            {exists.cedula.exist && <p>Listo!</p>}
            {exists.cedula.exist === false && (
              <File
                label={"No existe"}
                setValue={setValue}
                keyName={"cedula"}
              />
            )}
            {exists.cedula.exist === false && (
              <Input
                type="submit"
                value="Subir"
                className={styles.button}
                disabled={values.cedula.value === undefined}
                onClick={() => onSubmit("cedula")}
              />
            )}
          </>
        )}
      </div>

      <div
        className={`${styles.item} ${
          exists.opsu.exist ? styles.green : styles.orange
        }`}
      >
        <h3>Certificado de la OPSU</h3>
        {loading ? (
          <LottiePlayer src={Loader} width={100} height={100} />
        ) : (
          <>
            {exists.opsu.exist && <p>Listo!</p>}
            {exists.opsu.exist === false && (
              <File label={"No existe"} setValue={setValue} keyName={"opsu"} />
            )}
            {exists.opsu.exist === false && (
              <Input
                type="submit"
                value="Subir"
                className={styles.button}
                disabled={values.opsu.value === undefined}
                onClick={() => onSubmit("opsu")}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyFilesSection;

import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { Input, File, Category } from "components/FormComponents";
import styles from "./styles.module.scss";

const initialValue = {
  name: {
    value: "",
    isValid: false,
  },
  author: {
    value: "",
    isValid: false,
  },
  year: {
    value: "",
    isValid: false,
  },
  category: {
    value: "",
    isValid: false,
  },
  file: {
    value: "",
    isValid: false,
  },
};

const UploadForm = () => {
  const [values, setValues] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [canSend, setCanSend] = useState(true);
  const { uploadFile, getFileName, createNewRequest } =
    useContext(FirebaseContext);
  const date = new Date();

  const onSubmit = async (e) => {
    console.log("procesando");
    e.preventDefault();
    setCanSend(false);
    try {
      const fileData = await uploadFile(values.file.value);
      const urls = await getFileName(fileData.metadata.fullPath);
      const data = {
        author: values.author.value,
        name: values.name.value,
        year: values.year.value,
        categoryId: values.category.value,
        fileRef: urls.ref,
        isPublic: true,
        url: urls.url,
      };

      await createNewRequest(data);
      document.getElementById("uploadform").reset();
      setValues(initialValue);
    } catch (err) {
      console.log(err);
    } finally {
      setCanSend(true);
    }
  };

  const setValue = (value, key) => {
    const copy = { ...values };
    copy[key].value = value;
    if (["name", "author"].includes(key)) {
      copy[key].isValid = !["", " ", false].includes(value);
    }

    if (["file"].includes(key)) {
      copy[key].isValid = value !== undefined && typeof value === "object";
    }

    if (["year"].includes(key)) {
      copy[key].isValid = value !== undefined && value > 0 && value <= 2023;
    }

    if (["category"].includes(key)) {
      copy[key].isValid = !["", " ", false].includes(value);
    }

    setValues(copy);
  };

  useEffect(() => {
    const tmpValues = Object.values(values);
    setIsValid(!tmpValues.some((item) => item.isValid !== true));
  }, [values]);

  return (
    <div className={styles.container}>
      <form
        id="uploadform"
        className={styles.subcontainer}
        onSubmit={(e) => onSubmit(e)}
      >
        <div className={styles.info}>
          <h3>Formulario para subir un Nuevo Documento a la biblioteca</h3>
          <p>
            Es grato saber que deseas agregar un nuevo documento a la
            Protobiblioteca, sin embargo, es necesario que sepas que, debes
            colocar todos los datos correctamente para que el boton se active y
            ademas esperar la aprobacion de un administrador de la biblioteca
          </p>

          <p>Saludos de parte de la Protobiblioteca del CUAM</p>
        </div>

        <Input
          placeholder={"Nombre del Documento"}
          label={"Nombre del Documento"}
          setValue={setValue}
          keyName={"name"}
        />
        <Input
          placeholder={"Autor"}
          label={"Autor"}
          setValue={setValue}
          keyName={"author"}
        />
        <Input
          placeholder={"Año"}
          label={"Año"}
          type="number"
          id="tentacles"
          name="tentacles"
          min="1989"
          max={date.getFullYear()}
          setValue={setValue}
          keyName={"year"}
        />

        <Category
          label={"Categoría"}
          setValue={setValue}
          keyName={"category"}
        />

        {canSend && (
          <File label={"Archivo"} setValue={setValue} keyName={"file"} />
        )}

        {canSend && (
          <input type="submit" value={"Solicitar carga"} disabled={!isValid} />
        )}

        {!canSend && <h3>Subiendo Solicitud</h3>}
      </form>
    </div>
  );
};

export default UploadForm;

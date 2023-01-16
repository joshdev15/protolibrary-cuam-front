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
  const { uploadFile, getFileName, createNewRequest } =
    useContext(FirebaseContext);
  const date = new Date();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(e);
      const fileData = await uploadFile(values.file.value);
      console.log(fileData);
      const url = await getFileName(fileData.metadata.fullPath);
      console.log(url);
      const data = {
        author: values.author.value,
        name: values.author.value,
        year: values.year.value,
        categoryId: values.category.value,
        owner: user.email,
        isPublic: true,
        url,
      };

      await createNewRequest(data);
      document.getElementById("uploadform").reset();
      setValues(initialValue);
    } catch (err) {
      console.log(err);
    }
  };

  const setValue = (value, key) => {
    const copy = { ...values };
    console.log(copy, value, key);
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

        <File label={"Archivo"} setValue={setValue} keyName={"file"} />

        <input type="submit" value={"Solicitar carga"} disabled={!isValid} />
      </form>
    </div>
  );
};

export default UploadForm;

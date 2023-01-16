import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "context/FirebaseContext";
import { Input, File } from "components/FormComponents";
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
  console.log(date.getFullYear());

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
        categoryId: "",
        isPublic: true,
        url,
      };

      const last = await createNewRequest(data);
      console.log(last);
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

    setValues(copy);
  };

  useEffect(() => {
    const tmpValues = Object.values(values);
    setIsValid(!tmpValues.some((item) => item.isValid !== true));
  }, [values]);

  return (
    <div className={styles.container}>
      <form className={styles.subcontainer} onSubmit={(e) => onSubmit(e)}>
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

        <File label={"Archivo"} setValue={setValue} keyName={"file"} />

        <input type="submit" value={"Solicitar carga"} disabled={!isValid} />
      </form>
    </div>
  );
};

export default UploadForm;

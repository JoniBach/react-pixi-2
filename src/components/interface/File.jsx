import { useRef, useState } from "react";

const styles = {
  container:
    "flex rounded-xl m-2 p-1 bg-gradient-to-r from-red-400 to-pink-500 shadow-md shadow-cyan-500/50 font-normal text-black hover:bg-sky-700",
  label: "border-transparent rounded-lg bg-white w-full ",
  input: "w-max focus:outline-0 ",
  button:
    "py-1 px-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg  text-white hover:bg-sky-700",
};
export const File = ({ onChange }) => {
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    const file = await convertToBase64(fileUploaded);
    onChange(file).then(() => setFile(fileUploaded));
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <button onClick={() => handleClick()} className={styles.button}>
          {file ? "change" : "upload"}
        </button>
        file: {file?.name || "none"}
        <input
          className={styles.input}
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

const styles = {
  container:
    "flex rounded-xl m-2 p-1 bg-gradient-to-r from-red-400 to-pink-500 shadow-md shadow-cyan-500/50 font-normal text-black hover:bg-sky-700",
  label:
    "border-transparent rounded-lg bg-white w-full ",
  input: "w-max focus:outline-0 ",
  button: 'py-1 px-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg  text-white hover:bg-sky-700'
};
export const File = () => {
  return (
    <div className={styles.container}>
    
      <label className={styles.label}>
      <button className={styles.button}>
        Upload
      </button>
        file: test
        <input className={styles.input} />
      </label>
    </div>
  );
};

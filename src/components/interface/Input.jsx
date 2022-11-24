const styles = {
  container:
    "flex rounded-xl m-2 p-1 bg-gradient-to-r from-red-400 to-pink-500 shadow-md shadow-cyan-500/50 font-normal text-black hover:bg-sky-700",
  button: "border-transparent rounded-lg p-1 bg-white w-full ",
  input: "w-max focus:outline-0 ",
};
export const Input = ({ label, ...props }) => {
  return (
    <div className={styles.container}>
      <label className={styles.button}>
        {label && label + ": "}
        <input className={styles.input} {...props} />
      </label>
    </div>
  );
};

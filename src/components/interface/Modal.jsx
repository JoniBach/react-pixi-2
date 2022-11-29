const styles = {
  container:
    "bg-grey  flex rounded-xl m-5 p-1 bg-gradient-to-r from-red-400 to-pink-500 shadow-md shadow-cyan-500/50 font-normal text-black ",
  backdrop:
    "border-transparent rounded-lg p-3 bg-gradient-to-r from-red-50 to-blue-50 shadow-inner shadow-cyan-500/50 w-full ",
  input: "w-max focus:outline-0 ",
  title: "font-semibold w-full",
  headder: "flex",
  exit: "text-white bg-gradient-to-r from-red-400 to-pink-500 shadow-md shadow-cyan-500/50 rounded-full w-6 h-6 font-normal",
};
export const Modal = ({ children, title, onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop}>
        <div className={styles.headder}>
          <h3 className={styles.title}>{title}</h3>
          {/* <button className={styles.exit} onClick={() => onClose()}>x</button> */}
        </div>
        {children}
      </div>
    </div>
  );
};

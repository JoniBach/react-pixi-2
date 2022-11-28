const styles = {
  button:
    "flex shrink-0 rounded-xl m-2 px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 shadow-md shadow-cyan-500/50 font-normal text-white hover:bg-sky-700",
};
export const Button = ({children, ...props}) => {
  return (
      <button className={styles.button} {...props}>{children}</button>
  );
};

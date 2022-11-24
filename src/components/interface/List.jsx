const styles = {
  spacer:
    "rounded-xl  my-1 py-1 bg-gradient-to-r from-red-400 to-pink-500 shadow-md shadow-cyan-500/50",
  container: "mx-2",
  listItem: "flex",
  listIcon:
    "w-10 h-10 rounded-xl my-2  bg-gradient-to-r from-red-400 to-pink-500 shadow-md shadow-cyan-500/50",
  listTitle: "m-2",
};


export const List = ({ data = [], ...props }) => {
  return (
    <div className={styles.container}>
      {data.map(({ title }) => (
        <>
          <div className={styles.listItem}>
            <div className={styles.listIcon}></div>
            <h4 className={styles.listTitle}>{title}</h4>
          </div>
          <div className={styles.spacer} />
        </>
      ))}
    </div>
  );
};

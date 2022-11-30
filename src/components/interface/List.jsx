import { Edit, PlayArrow } from "@styled-icons/material";

const styles = {
  spacer:
    "rounded-xl  my-1 py-1 bg-gradient-to-r from-red-400 to-pink-500 shadow-md shadow-cyan-500/50",
  container: "mx-2",
  listItem: "flex",
  listIcon:
    "w-10 h-10 rounded-xl my-2 mr-1 bg-gradient-to-r from-red-400 to-pink-500 shadow-md shadow-cyan-500/50",
  listTitle: "m-2",
  listDate: "text-xs m-2",
};

export const List = ({ data = [], onPlay, onEdit, ...props }) => {
  return (
    <div className={styles.container}>
      {data.map(({ title, updatedAt, _id }, i) => (
        <>
          <div className={styles.listItem}>
            <button onClick={() => onPlay(_id)} className={styles.listIcon}>
              <PlayArrow color="white" />
            </button>
            <button onClick={() => onEdit(_id)} className={styles.listIcon}>
              <Edit color="white" />
            </button>
            <div>
              <h4 className={styles.listTitle}>{title}</h4>
              <h6 className={styles.listDate}>{updatedAt}</h6>
            </div>
          </div>
          <div className={styles.spacer} />
        </>
      ))}
    </div>
  );
};

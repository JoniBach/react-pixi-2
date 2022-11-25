import { Menu } from "@styled-icons/material";
import { useRef, useState } from "react";
import { Drawer } from "./Drawer";

const styles = {
  container:
    "flex rounded-l-full rounded-r-lg m-1 p-1 bg-gradient-to-r from-red-400 to-pink-500 shadow-md shadow-cyan-500/50 font-normal text-black hover:bg-sky-700",
  label: "flex border-transparent rounded-l-full bg-white w-full ",
  button:
    "shrink-0 w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 rounded-full  text-white hover:bg-sky-700",
  titleSpace: 'm-1 text-2xl h-full w-full align-middle text-center'
};

export const Nav = ({ onChange }) => {
  const [active, setActive] = useState(false)

  const handleClick = (event) => {
    setActive(true)
  };

  return (
    <>
    <Drawer active={active} onClose={() => setActive(false)} />
    <div className={styles.container}>
      <label className={styles.label}>
        <button onClick={() => handleClick()} className={styles.button}>
          <Menu size={20} />
        </button>
        <div className={styles.titleSpace}>
          games
        </div>
      </label>
    </div>

    </>
  );
};

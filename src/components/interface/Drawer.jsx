import {
  ArtTrack,
  Edit,
  Gamepad,
  LockClock,
  Menu,
  Palette,
} from "@styled-icons/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const styles = {
  container:
    "rounded-r-2xl fixed w-3/4 h-full bg-gradient-to-r from-red-400 to-pink-500 ",
  item: "cursor-pointer m-7 rounded-full p-1 flex  bg-gradient-to-r from-red-50 to-blue-50 shadow-inner shadow-cyan-500/50",
  icon: "shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-red-400 to-pink-500 p-1",
  text: "m-2 w-full text-right",
  bg: "rounded-r-2xl fixed w-full h-full bg-gray-900 opacity-50",
};


export const Drawer = ({ onChange, active, onClose }) => {

  const {signOut} = useUser()
  
const data = [
  {
    label: "game creator",
    link: "/creator",
    Icon: ({ color }) => <Edit color={color} />,
  },
  {
    label: "original game creator",
    link: "/creator-old",
    Icon: ({ color }) => <LockClock color={color} />,
  },
  {
    label: "game player",
    link: "/player",
    Icon: ({ color }) => <Gamepad color={color} />,
  },
  {
    label: "style guide",
    link: "/styles",
    Icon: ({ color }) => <Palette color={color} />,
  },
  {
    label: "log out",
    onClick: () => signOut(),
    Icon: ({ color }) => <Palette color={color} />,
  },
];
  const handleEscape = ({ key }) => {
    if (key === "Escape") {
      onClose();
    }
  };
  console.log(active);

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div>
      {active && (
        <>
          <div className={styles.bg} />
          <div className={styles.container}>
            {data.map(({ label, link, Icon, onClick }) => (
              <div onClick={onClick}>
                {link ? (
                  <Link className={styles.item}  to={link}>
                    <div className={styles.icon}>{<Icon color="white" />}</div>
                    <div className={styles.text}>{label}</div>
                  </Link>
                ) : (
                  <div className={styles.item} >
                    <div className={styles.icon}>{<Icon color="white" />}</div>
                    <div className={styles.text}>{label}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

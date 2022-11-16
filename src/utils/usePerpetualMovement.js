import { useEffect, useState } from "react";

export const useLastKeyDown = (options) => {
  const [keyPressed, setKeyPressed] = useState("");

  function downHandler({ key }) {
    if (options.includes(key)) {
      setKeyPressed(key);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);
  return keyPressed;
};

export const usePerpetualMovement = ({pace = 1}) => {
  const key = useLastKeyDown(["w", "a", "s", "d"]);

  const getMovement = () => {
    switch (key) {
      case "w":
        return { x: 0 * pace, y: -1 * pace};
      case "a":
        return { x: -1 * pace, y: 0 * pace};
      case "s":
        return { x: 0 * pace, y: 1 * pace};
      case "d":
        return { x: 1 * pace, y: 0 * pace};

      default:
        return {x: 0, y: 0}
        break;
    }
  };

  return getMovement()
};

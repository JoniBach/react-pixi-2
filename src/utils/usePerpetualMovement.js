import { useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { useKeyPress } from "./useKeyPress";



export const usePerpetualMovement = ({pace = 1, start, buffer}) => {
  const up = useKeyPress("w");
  const down = useKeyPress("s");
  const left = useKeyPress("a");
  const right = useKeyPress("d");

  const [direction, setDirection] = useState("");

  const [pos, setPos] = useState({ x: start.x, y: start.y });

  const characterRef = useRef();
  const character = characterRef?.current;
  const [obstacle, setObstacle] = useState([]);

  const checkNextMovement = (a, b) => {
    var ab = a.getBounds();
    var bb = b.getBounds();

    const base = false;

    if (
      ab.x + ab.width > bb.x &&
      ab.x < bb.x + bb.width &&
      ab.y + buffer + ab.height > bb.y &&
      ab.y < bb.y + bb.height
    ) {
      return "up";
    }
    if (
      ab.x + ab.width > bb.x &&
      ab.x < bb.x + bb.width &&
      ab.y + ab.height > bb.y &&
      ab.y - buffer < bb.y + bb.height
    ) {
      return "down";
    }
    if (
      ab.x + buffer + ab.width > bb.x &&
      ab.x < bb.x + bb.width &&
      ab.y + ab.height > bb.y &&
      ab.y < bb.y + bb.height
    ) {
      return "left";
    }
    if (
      ab.x + ab.width > bb.x &&
      ab.x - buffer < bb.x + bb.width &&
      ab.y + ab.height > bb.y &&
      ab.y < bb.y + bb.height
    ) {
      return "right";
    }
    return base;
  };

  const demo = obstacle.map((e) => checkNextMovement(e, character));
  const upBlocked = demo.includes("up");
  const downBlocked = demo.includes("down");
  const leftBlocked = demo.includes("left");
  const rightBlocked = demo.includes("right");

  useTick((delta) => {
    // if (contolledBy === "player") {
      if (direction === "up" && !upBlocked) {
        setPos({
          x: pos?.x,
          y: pos?.y - pace,
        });
      }

      if (direction === "down" && !downBlocked) {
        setPos({
          x: pos?.x,
          y: pos?.y + pace,
        });
      }

      if (direction === "left" && !leftBlocked) {
        setPos({
          x: pos?.x - pace,
          y: pos?.y,
        });
      }

      if (direction === "right" && !rightBlocked) {
        setPos({
          x: pos?.x + pace,
          y: pos?.y,
        });
      }
    // }
  });


  const changeDir = () => {
    if (up) {
      if (!upBlocked) {
        setDirection("up");
      }
    }

    if (down) {
      if (!downBlocked) {
        setDirection("down");
      }
    }

    if (right) {
      if (!rightBlocked) {
        setDirection("right");
      }
    }

    if (left) {
      if (!leftBlocked) {
        setDirection("left");
      }
    }
  };

  const handleStop = () => {
    if (direction === "up" && upBlocked) {
      setDirection("stop");
    }
    if (direction === "down" && downBlocked) {
      setDirection("stop");
    }

    if (direction === "left" && leftBlocked) {
      setDirection("stop");
    }
    if (direction === "right" && rightBlocked) {
      setDirection("stop");
    }
  };

  useEffect(() => {
    changeDir();
    handleStop();
  }, [pos, up, down, left, right]);

  return ({characterRef, pos, setObstacle})
};

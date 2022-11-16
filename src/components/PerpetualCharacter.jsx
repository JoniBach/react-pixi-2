import { Sprite, useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { useKeyPress } from "../utils/useKeyPress";
import { useMovement } from "../utils/useMovement";
import {
  useLastKeyDown,
  usePerpetualMovement,
} from "../utils/usePerpetualMovement";
import { useTouch } from "../utils/useTouch";
import Environment from "./Environment";

export const PerpetualCharacter = ({
  obstacles,
  image,
  start = 0,
  contolledBy,
  scale = 1,
  toggle,
}) => {

  const pace = 2
  const buffer = 5;


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
    if (contolledBy === "player") {
      if (direction === 'up' && !upBlocked) {
        setPos({
          x: pos?.x,
          y: pos?.y - pace,
        });
      }

      if (direction === 'down' && !downBlocked) {
        setPos({
          x: pos?.x,
          y: pos?.y + pace,
        });
      }

      if (direction === 'left' && !leftBlocked) {
        setPos({
          x: pos?.x - pace,
          y: pos?.y,
        });
      }

      if (direction === 'right' && !rightBlocked) {
        setPos({
          x: pos?.x + pace,
          y: pos?.y,
        });
      }
    }
  });

  const changeDir = ({ key, repeat }) => {
    switch (key) {
      case "w":
        if (!upBlocked) {
          setDirection("up");
        }
        break;
      case "s":
        if (!downBlocked) {
          setDirection("down");
        }
        break;
      case "d":
        if (!rightBlocked) {
          setDirection("right");
        }
        break;
      case "a":
        if (!leftBlocked) {
          setDirection("left");
        }
        break;
      default:

        break;
    }
  };

  const handleStop = () => {
    if (direction === 'up' && upBlocked) {
      setDirection("stop");
    }
    if (direction === 'down' && downBlocked) {
      setDirection("stop");
    }

    if (direction === 'left' && leftBlocked) {
      setDirection("stop");
    }
    if (direction === 'right' && rightBlocked) {
      setDirection("stop");
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", changeDir);
    handleStop()
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", changeDir);
    };
  }, [pos]);

  return (
    <>
      <Sprite
        image={image}
        scale={{ x: scale / 1.2, y: scale / 1.2 }}
        ref={characterRef}
        {...pos}
      />

      <Environment
        obstacles={obstacles}
        scale={scale}
        setObstacles={(e) => setObstacle(e)}
      />
    </>
  );
};

export default PerpetualCharacter;

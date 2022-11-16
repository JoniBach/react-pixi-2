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
  const pace = 1;

  const { x, y } = useMovement({ pace });
  const key = useLastKeyDown(["w", "a", "s", "d"]);
  const up = useKeyPress("w");
  const down = useKeyPress("s");
  const left = useKeyPress("a");
  const right = useKeyPress("d");

  const [direction, setDirection] = useState('')

  const [pos, setPos] = useState({ x: start.x, y: start.y });

  const characterRef = useRef();
  const character = characterRef?.current;
  const [obstacle, setObstacle] = useState([]);

  const checkNextMovement = (a, b) => {
    var ab = a.getBounds();
    var bb = b.getBounds();

    const base = false;

    if (up) {
      if (
        ab.x + ab.width > bb.x &&
        ab.x < bb.x + bb.width &&
        ab.y + 1 + ab.height > bb.y &&
        ab.y < bb.y + bb.height
      ) {
        return "up";
      }
    }
    if (down) {
      if (
        ab.x + ab.width > bb.x &&
        ab.x < bb.x + bb.width &&
        ab.y + ab.height > bb.y &&
        ab.y - 1 < bb.y + bb.height
      ) {
        return "down";
      }
    }
    if (left) {
      if (
        ab.x + 1 + ab.width > bb.x &&
        ab.x < bb.x + bb.width &&
        ab.y + ab.height > bb.y &&
        ab.y < bb.y + bb.height
      ) {
        return "left";
      }
    }
    if (right) {
      if (
        ab.x + ab.width > bb.x &&
        ab.x - 1 < bb.x + bb.width &&
        ab.y + ab.height > bb.y &&
        ab.y < bb.y + bb.height
      ) {
        return "right";
      }
    }
    return base;
  };

  useTick((delta) => {
    if (contolledBy === "player") {
      const demo = obstacle.map((e) => checkNextMovement(e, character));
      const upBlocked = demo.includes("up");
      const downBlocked = demo.includes("down");
      const leftBlocked = demo.includes("left");
      const rightBlocked = demo.includes("right");

      if (up && !upBlocked) {
        setDirection('up')
        setPos({
          x: pos?.x,
          y: pos?.y - 1,
        });
      }

      if (down && !downBlocked) {
        setDirection('down')
        setPos({
          x: pos?.x,
          y: pos?.y + 1,
        });
      }

      if (left && !leftBlocked) {
        setDirection('left')
        setPos({
          x: pos?.x - 1,
          y: pos?.y,
        });
      }

      if (right && !rightBlocked) {
        setDirection('right')
        setPos({
          x: pos?.x + 1,
          y: pos?.y,
        });
      }
    }
  });

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

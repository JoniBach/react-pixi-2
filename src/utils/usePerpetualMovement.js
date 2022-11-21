import { useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { useKeyPress } from "./useKeyPress";



export const usePerpetualMovement = ({pace = 1, scale, size, buffer = 1}) => {
  const up = useKeyPress("w");
  const down = useKeyPress("s");
  const left = useKeyPress("a");
  const right = useKeyPress("d");

  const [direction, setDirection] = useState("");

  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  const characterRef = useRef();
  const character = characterRef?.current;
  const [obstacle, setObstacle] = useState([]);

  const checkNextMovement = (a, b) => {
    var ab = a.getBounds();
    var bb = b.getBounds();

    const base = false;
    
    const safe = 1
    const buffer = 4

    if (
      ab.x + ab.width - safe > bb.x &&
      ab.x < bb.x + bb.width - safe &&
      ab.y + buffer + ab.height - safe > bb.y &&
      ab.y < bb.y + bb.height - safe
    ) {
      return "up";
    }
    if (
      ab.x + ab.width - safe > bb.x &&
      ab.x < bb.x + bb.width - safe &&
      ab.y + ab.height - safe > bb.y &&
      ab.y - buffer < bb.y + bb.height - safe
    ) {
      return "down";
    }
    if (
      ab.x + buffer + ab.width - safe > bb.x &&
      ab.x < bb.x + bb.width - safe &&
      ab.y + ab.height - safe > bb.y &&
      ab.y < bb.y + bb.height - safe
    ) {
      return "left";
    }
    if (
      ab.x + ab.width - safe > bb.x &&
      ab.x - buffer < bb.x + bb.width - safe &&
      ab.y + ab.height - safe > bb.y &&
      ab.y < bb.y + bb.height - safe
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
      if (direction === "up") {
        setPos({
          x: pos?.x,
          y: pos?.y - pace,
        });
      }

      if (direction === "down" ) {
        setPos({
          x: pos?.x,
          y: pos?.y + pace,
        });
      }

      if (direction === "left" ) {
        setPos({
          x: pos?.x - pace,
          y: pos?.y,
        });
      }

      if (direction === "right") {
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

  const setSpawn = (e) => {
    const startPos = {x:  e[0].position.x, y:  e[0].position.y}
    setPos(startPos)
  }

  const setSpawnCell = (e) => {
    const startPos = {
      x:  e[0] * size ,
      y:  e[1] * size }
    console.log(scale)
    setPos(startPos)
  }
  
  useEffect(() => {
    changeDir();
    handleStop();
  }, [pos, up, down, left, right]);

  return ({characterRef, pos, setObstacle, setSpawn, setSpawnCell})
};

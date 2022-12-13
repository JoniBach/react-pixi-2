import { useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { useKeyPress } from "./useKeyPress";

export const usePerpetualMovement = ({ pace = 1, scale, size, buffer = 1 }) => {
  const up = useKeyPress("w");
  const down = useKeyPress("s");
  const left = useKeyPress("a");
  const right = useKeyPress("d");

  const [direction, setDirection] = useState("");
  const [prvDirection, setPrvDirection] = useState("");

  const [enemyDirection, setEnemyDirection] = useState("");
  const [prvEnemyDirection, setPrvEnemyDirection] = useState("");

  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [enemyPos, setEnemyPos] = useState({ x: -9999, y: -9999 });

  const xDiff = Math.abs(pos.x - enemyPos.x);
  const yDiff = Math.abs(pos.y - enemyPos.y);

  const targetDistance = xDiff + yDiff;

  // console.log(targetDistance);

  const characterRef = useRef();
  const enemyRef = useRef();
  const character = characterRef?.current;
  const enemy = enemyRef?.current;
  const [obstacle, setObstacle] = useState([]);
  const [consumaables, setConsumable] = useState([]);
  const [scorePoints, setScorePoint] = useState([]);
  const [scoredPoints, setScoredPoints] = useState([]);
  const [initialSpawnCell, setInitialSpawnCell] = useState([]);
  const [initialEnemySpawnCell, setInitialEnemySpawnCell] = useState([]);
  const [lives, setLives] = useState(3);
  // const [newScoreCells, setNewScoreCells] = useState([]);
  const [score, setScore] = useState(0);

  const checkCollision = (a, b) => {
    var ab = a?.getBounds();
    var bb = b?.getBounds();

    if (
      ab.x + ab.width > bb.x &&
      ab.x < bb.x + bb.width &&
      ab.y + ab.height > bb.y &&
      ab.y < bb.y + bb.height
    )
      return true;
  };

  const checkNextMovement = (a, b) => {
    var ab = a.getBounds();
    var bb = b.getBounds();

    const base = false;

    const safe = 2;
    const buffer = 4;

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

  const nextPlayerMove = obstacle.map((e) => checkNextMovement(e, character));
  const upBlocked = nextPlayerMove.includes("up");
  const downBlocked = nextPlayerMove.includes("down");
  const leftBlocked = nextPlayerMove.includes("left");
  const rightBlocked = nextPlayerMove.includes("right");

  const nextCpuMove = obstacle.map((e) => checkNextMovement(e, enemy));
  const cpuUpBlocked = nextCpuMove.includes("up");
  const cpuDownBlocked = nextCpuMove.includes("down");
  const cpuLeftBlocked = nextCpuMove.includes("left");
  const cpuRightBlocked = nextCpuMove.includes("right");

  const setSpawn = (e) => {
    const startPos = { x: e[0].position.x, y: e[0].position.y };
    setPos(startPos);
  };
  const setSpawnCell = (e) => {
    setInitialSpawnCell(e);
    const startPos = {
      x: e[0] * size,
      y: e[1] * size,
    };
    setPos(startPos);
  };
  const setEnemySpawnCell = (e) => {
    setInitialEnemySpawnCell(e)
    const enemyStartPos = {
      x: e[0] * size,
      y: e[1] * size,
    };
    setEnemyPos(enemyStartPos);
  };

  const getDiff = (objA, objB) => {
    const xDiff = Math.abs(objA.x - objB.x);
    const yDiff = Math.abs(objA.y - objB.y);

    const targetDistance = xDiff + yDiff;
    return targetDistance;
  };

  const chooseDir = () => {
    const diffL = getDiff(
      { x: enemyPos.x - size, y: enemyPos.y },
      { x: pos.x, y: pos.y }
    );
    const diffR = getDiff(
      { x: enemyPos.x + size, y: enemyPos.y },
      { x: pos.x, y: pos.y }
    );
    const diffU = getDiff(
      { x: enemyPos.x, y: enemyPos.y - size },
      { x: pos.x, y: pos.y }
    );
    const diffD = getDiff(
      { x: enemyPos.x, y: enemyPos.y + size },
      { x: pos.x, y: pos.y }
    );

    const choices = [
      {
        name: "up",
        isBlocked: cpuUpBlocked,
        isUsed: prvEnemyDirection === "up",
        isNotBack: prvEnemyDirection === "down",
        dist: diffU,
      },
      {
        name: "down",
        isBlocked: cpuDownBlocked,
        isUsed: prvEnemyDirection === "down",
        isNotBack: prvEnemyDirection === "up",
        dist: diffD,
      },
      {
        name: "left",
        isBlocked: cpuLeftBlocked,
        isUsed: prvEnemyDirection === "left",
        isNotBack: prvEnemyDirection === "right",
        dist: diffL,
      },
      {
        name: "right",
        isBlocked: cpuRightBlocked,
        isUsed: prvEnemyDirection === "right",
        isNotBack: prvEnemyDirection === "left",
        dist: diffR,
      },
    ];

    const unblockedRoutes = choices.filter((choice) => !choice.isBlocked);

    const newRoutes = unblockedRoutes.filter((choice) => !choice.isNotBack);

    const finalChoices = newRoutes.length === 0 ? unblockedRoutes : newRoutes;

    const closestChoice = finalChoices.sort((a, b) => a.dist - b.dist);

    return closestChoice[0]?.name;
  };

  const handleScore = () => {
    const scored = scorePoints.filter((point) =>
      checkCollision(character, point)
    );
    if (scored.length) {
      const scoredBounds = scored[0].getBounds();
      const x = Math.trunc(scoredBounds.x / size);
      const y = Math.trunc(scoredBounds.y / size);

      const itemString = [x, y].toString();

      const filteredArr = scorePoints.filter(
        (obj) =>
          [
            Math.trunc(obj.getBounds().x / size),
            Math.trunc(obj.getBounds().y / size),
          ].toString() !== itemString
      );
      setScoredPoints([...scoredPoints, [x, y]]);
      setScorePoint(filteredArr);
      setScore(score + 1);

      return true;
    } else return null;
  };

  const movePlayer = () => {
    if (direction === "up") {
      setPos({
        x: pos?.x,
        y: pos?.y - pace,
      });
    }

    if (direction === "down") {
      setPos({
        x: pos?.x,
        y: pos?.y + pace,
      });
    }

    if (direction === "left") {
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
  };

  const moveEnemy = () => {
    if (enemyDirection === "up") {
      setEnemyPos({
        x: enemyPos?.x,
        y: enemyPos?.y - pace,
      });
    }

    if (enemyDirection === "down") {
      setEnemyPos({
        x: enemyPos?.x,
        y: enemyPos?.y + pace,
      });
    }

    if (enemyDirection === "left") {
      setEnemyPos({
        x: enemyPos?.x - pace,
        y: enemyPos?.y,
      });
    }

    if (enemyDirection === "right") {
      setEnemyPos({
        x: enemyPos?.x + pace,
        y: enemyPos?.y,
      });
    }
  };
  const caught = () => {
    const intersect = checkCollision(character, enemy);
    if (intersect) {
      setSpawnCell(initialSpawnCell);
      setEnemySpawnCell(initialEnemySpawnCell);
      setLives(lives-1)
    }
    return true;
  };

  useTick((delta) => {
    handleScore();
    movePlayer();
    moveEnemy();
    caught();
  });

  const changeDir = () => {
    if (up) {
      if (!upBlocked) {
        setDirection("up");
        setPrvDirection("up");
      }
    }

    if (down) {
      if (!downBlocked) {
        setDirection("down");
        setPrvDirection("down");
      }
    }

    if (right) {
      if (!rightBlocked) {
        setDirection("right");
        setPrvDirection("right");
      }
    }

    if (left) {
      if (!leftBlocked) {
        setDirection("left");
        setPrvDirection("left");
      }
    }
  };
  const changeEnemyDir = () => {
    if (chooseDir() === "up") {
      if (!cpuUpBlocked) {
        setEnemyDirection("up");
        setPrvEnemyDirection("up");
      }
    }

    if (chooseDir() === "down") {
      if (!cpuDownBlocked) {
        setEnemyDirection("down");
        setPrvEnemyDirection("down");
      }
    }

    if (chooseDir() === "right") {
      if (!cpuRightBlocked) {
        setEnemyDirection("right");
        setPrvEnemyDirection("right");
      }
    }

    if (chooseDir() === "left") {
      if (!cpuLeftBlocked) {
        setEnemyDirection("left");
        setPrvEnemyDirection("left");
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

  const handleEnemyStop = () => {
    if (enemyDirection === "up" && cpuUpBlocked) {
      setEnemyDirection("stop");
    }
    if (enemyDirection === "down" && cpuDownBlocked) {
      setEnemyDirection("stop");
    }

    if (enemyDirection === "left" && cpuLeftBlocked) {
      setEnemyDirection("stop");
    }
    if (enemyDirection === "right" && cpuRightBlocked) {
      setEnemyDirection("stop");
    }
  };




  useEffect(() => {
    changeDir();
    handleStop();
    changeEnemyDir();
    handleEnemyStop();
  }, [pos, up, down, left, right, enemyPos]);

  const newScoreCells = scorePoints.map((p) => [
    Math.trunc(p.getBounds().x / size),
    Math.trunc(p.getBounds().y / size),
  ]);
  return {
    characterRef,
    pos,
    score,
    consumaables,
    scorePoints,
    newScoreCells,
    scoredPoints,
    enemyRef,
    enemyPos,
    lives,
    // setNewScoreCells,
    setScore,
    setEnemySpawnCell,
    setObstacle,
    setSpawn,
    setSpawnCell,
    setConsumable,
    setScorePoint,
  };
};

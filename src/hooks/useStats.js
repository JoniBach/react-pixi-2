import { useEffect, useState } from "react";

export const useStats = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const getSecondsDiff = (startDate, endDate) =>
    Math.round(Math.abs(endDate - startDate) / 1000);

  const time = getSecondsDiff(startTime, new Date());

  const updateScore = (number) => setScore(score + number);
  const resetScore = (number = 0) => setScore(number);
  const looseLife = (number = 1) => setLives(lives - number);
  const gainLife = (number = 1) => setLives(lives + number);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  const stats = {
    // vars
    score,
    lives,
    time,

    // funcs
    updateScore,
    resetScore,
    looseLife,
    gainLife,
  };

  return stats;
};

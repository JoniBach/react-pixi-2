import axios from "axios";

export const useGame = () => {
  const createGame = async (gameData) => {
    const { data } = await axios.post("/create", gameData);
    return data;
  };
  return { createGame };
};

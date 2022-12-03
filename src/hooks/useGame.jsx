import axios from "axios";

export const useGame = () => {
  const createGame = async (gameData) => {
    const { data } = await axios.post("/create", gameData);
    return data;
  };
  const saveGame = async (gameData) => {
    const { data } = await axios.put("/save", gameData);
    return data;
  };
  const getGames = async (username) => {
    const { data } = await axios.get("/list", {
      params: {
        username,
      },
    });
    return data;
  };
  const getGame = async (_id) => {
    const { data } = await axios.get("/load-one", {
      params: {
        _id,
      },
    });
    console.log(data);
    return data;
  };
  return { createGame, getGames, getGame, saveGame };
};

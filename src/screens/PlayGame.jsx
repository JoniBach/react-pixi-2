import { Repeat } from "@styled-icons/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GameBuilder from "../components/gaming/GameBuilder";
import GamePlayer from "../components/gaming/GamePlayer";
import { Button } from "../components/interface/Button";
import { useGame } from "../hooks/useGame";
import { options } from "../mockData/options";
import { getSize } from "../utils/getSize";
import { useQuery } from "../utils/useQuery";

export const PlayGame = () => {
  const id = useQuery();
  const { getGame, saveGame } = useGame();
  const [game, setGame] = useState({});
  const navigate = useNavigate();

  const [goals, setGoals] = useState(null);

  console.log(game);

  const handleFetch = async () => {
    const res = await getGame(id);
    if (res?.game) {
      setGame(res.game);
      return res;
    } else {
      alert(res.message);
      return null;
    }
  };

  useEffect(() => {
    handleFetch(id);
  }, []);
  useEffect(() => {
    if (game) {
      setGoals(game.goalData);
    }
  }, [game]);
  
  console.log(game);

  return (
    <div>
      {game.cellQuantity && (
        <>
          <GamePlayer
            size={getSize}
            initialEnvironment={game.environmentData}
            initialScorePoints={game.goalData}
            initialConsumables={game.consumableData}
            initialEnemySpawn={game.enemySpawnData}
            cellQuantity={game.cellQuantity}
            options={options}
            data={game}
            image={
              "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
            }
          />
        </>
      )}
    </div>
  );
};

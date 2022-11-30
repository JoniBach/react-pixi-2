import { Repeat } from "@styled-icons/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GameBuilder from "../components/gaming/GameBuilder";
import { Button } from "../components/interface/Button";
import { useGame } from "../hooks/useGame";
import { getSize } from "../utils/getSize";
import { useQuery } from "../utils/useQuery";

export const EditGame = () => {
  const id = useQuery();
  const { getGame, saveGame } = useGame();
  const [game, setGame] = useState({});
  const navigate = useNavigate();

  console.log(id);

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

  const handleSave = async (e) => {
    const res = await saveGame({ ...game, environmentData: e });
    if (res?.body?._id) {
      alert(res.message);
      navigate("/dash");

      return res;
    } else {
      alert(res.message);
      return null;
    }
  };

  useEffect(() => {
    handleFetch(id);
  }, []);
  console.log(game);

  return (
    <div>
      {game?.cellQuantity && (
        <>
          <GameBuilder
            size={getSize}
            initialEnvironment={game.environmentData}
            onSave={handleSave}
            cellQuantity={game.cellQuantity}
          />
        </>
      )}
    </div>
  );
};

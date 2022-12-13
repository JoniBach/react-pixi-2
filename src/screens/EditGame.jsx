import { Repeat } from "@styled-icons/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGame, saveGame } from "../api/game";
import GameBuilder from "../components/gaming/GameBuilder";
import GameBuilder2 from "../components/gaming/v2/GameBuilder2";
import { Button } from "../components/interface/Button";
import { getSize } from "../utils/getSize";
import { useQuery } from "../utils/useQuery";

export const EditGame = () => {
  const id = useQuery();
  const [game, setGame] = useState({});
  const navigate = useNavigate();

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
    const res = await saveGame({ ...game, ...e});
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

  return (
    <div>
      {game?.cellQuantity && (
        <>
          <GameBuilder2
            size={getSize}
            initialEnvironment={game}
            onSave={handleSave}
            cellQuantity={game.cellQuantity}
          />
        </>
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGames } from "../api/game";
import { List } from "../components/interface/List";
import { Modal } from "../components/interface/Modal";
import { useUser } from "../contexts/UserContext";

export const GameDash = () => {
  const { activeUser } = useUser();
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("loading games");
  const navigate = useNavigate();
  const handleGames = async () => {
    const res = await getGames(activeUser.username);
    setTitle(res.message);
    setGames(res.games);
  };
  const handleEdit = (_id) => {
    console.log(_id);
    navigate(`/dash/edit?id=${_id}`);
  };

  const handlePlay = (_id) => {
    console.log(_id);
    navigate(`/dash/play?id=${_id}`);
  };

  useEffect(() => {
    handleGames();
  }, [activeUser]);

  return (
    <div>
      <Modal title={title}>
        <List data={games} onPlay={handlePlay} onEdit={handleEdit} />
      </Modal>
    </div>
  );
};

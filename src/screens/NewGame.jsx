import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { File } from "../components/interface/File";
import { Input } from "../components/interface/Input";
import { Wizard } from "../components/interface/Wizard";
import { useUser } from "../contexts/UserContext";
import { useGame } from "../hooks/useGame";
export const NewGame = () => {
  const { createGame } = useGame();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cells, setCells] = useState("");
  const [overlay, setOverlay] = useState("");
  const { activeUser } = useUser();

  const handleOverlay = async (file) => {
    setOverlay(file);
    return file;
  };
  const handleSave = async () => {
    const payload = {
      username: activeUser.username,
      title: name,
      environmentData: [],
      spawnData: [],
      imageOverlay: overlay,
    };

    const res = await createGame(payload);
    alert(res.message);

    if (res?.body?.title) {
      navigate("/dash");
      return res.body;
    }
    return null;
  };

  const steps = [
    {
      title: "give your game a name",
      Component: (
        <div>
          <Input
            label="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      ),
    },
    {
      title: "lets add some properties",
      Component: (
        <div>
          <Input
            label="number of cells"
            id="cells"
            value={cells}
            onChange={(e) => setCells(e.target.value)}
          />
          <File
            label="image overlay"
            onChange={(file) => handleOverlay(file)}
          />
          {/* <File
            label="load existing game"
            onChange={(file) => setLoadCoordinates(file)}
          /> */}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Wizard steps={steps} onSave={() => handleSave()} />
    </div>
  );
};

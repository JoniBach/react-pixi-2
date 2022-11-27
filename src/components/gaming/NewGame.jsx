import { useState } from "react";
import { File } from "../interface/File";
import { Input } from "../interface/Input";
import { Wizard } from "../interface/Wizard";

export const NewGame = () => {
  const [name, setName] = useState("");
  const [cells, setCells] = useState("");
  const [overlay, setOverlay] = useState("");
//   const [loadCoordinates, setLoadCoordinates] = useState();

  const handleOverlay = async (file) => {
    setOverlay(file);
    return file;
  };

//   const handleLoad = async (file) => {
//     setOverlay(file);
//     return file;
//   };

  const handleSave = () => {
    const payload = {
      properties: {
        name,
        cells,
        overlay,
      },
      environment: {
        obstacles: [[]],
        playerSpawn: [],
        monsterSpawn: [],
        collectables: [[]],
        traps: [[]],
      },
      author: {
        name: "Jon Doe",
      },
      created: new Date(),
      updated: new Date(),
    };
    console.log(payload);
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

/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Sprite, Stage } from "@inlet/react-pixi";
import { JoyStick } from "../components/JoyStick";
import Character from "../components/Character";
import Environment from "../components/Environment";
import PerpetualCharacter from "../components/PerpetualCharacter";

const buildingBox = 0x333333
const obstacles = [
  {
    color: buildingBox,
    dimensions: [50, 50, 100, 200],
  },
  {
    color: buildingBox,
    dimensions: [200, 50, 100, 100],
  },
  {
    color: buildingBox,
    dimensions: [350, 50, 600, 100],
  },
  {
    color: buildingBox,
    dimensions: [850, 200, 100, 100],
  },
  {
    color: buildingBox,
    dimensions: [450, 200, 350, 100],
  },
  {
    color: buildingBox,
    dimensions: [850, 350, 100, 450],
  },
// 
  {
    color: buildingBox,
    dimensions: [200, 200, 200, 100],
  },
  {
    color: buildingBox,
    dimensions: [200, 200, 100, 200],
  },
// 
  {
    color: buildingBox,
    dimensions: [50, 850, 900, 100],
  },
  {
    color: buildingBox,
    dimensions: [50, 300, 100, 600],
  },
// 
  {
    color: buildingBox,
    dimensions: [200, 700, 300, 100],
  },
  {
    color: buildingBox,
    dimensions: [200, 450, 100, 300],
  },
  // 
  {
    color: buildingBox,
    dimensions: [550, 700, 250, 100],
  },
  {
    color: buildingBox,
    dimensions: [700, 350, 100, 400],
  },

  {
    color: 0x111111,
    dimensions: [350, 350, 300, 300],
  },

];

const options = {
  backgroundColor: 0x353734,
};

export function MapChaser({ dimensions, scale }) {
  const mapSize = {
    x: dimensions.x * scale,
    y: dimensions.x * scale,
  };

  return (
    <div>
      <Stage width={mapSize.x} height={mapSize.y} options={options}>
      
        <PerpetualCharacter
          start={{ x: 200, y: 152 }}
          contolledBy="player"
          image="player.png"
          scale={scale}
          obstacles={obstacles}
        />
   <Character
          image="park_texture.png"
          start={{ x: 0, y: 0 }}
          scale={scale}
        />
      </Stage>
    </div>
  );
}

export default MapChaser;

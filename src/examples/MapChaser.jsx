/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Sprite, Stage } from "@inlet/react-pixi";
import { JoyStick } from "../components/JoyStick";
import Character from "../components/Character";
import Environment from "../components/Environment";
import PerpetualCharacter from "../components/PerpetualCharacter";
const obstacles = [
  {
    color: 0xc0c0c0,
    dimensions: [50, 50, 100, 200],
  },
  {
    color: 0xc0c0c0,
    dimensions: [200, 50, 100, 100],
  },
  {
    color: 0xc0c0c0,
    dimensions: [350, 50, 600, 100],
  },
  {
    color: 0xc0c0c0,
    dimensions: [850, 200, 100, 100],
  },
  {
    color: 0xc0c0c0,
    dimensions: [450, 200, 350, 100],
  },
  {
    color: 0xc0c0c0,
    dimensions: [850, 350, 100, 450],
  },
// 
  {
    color: 0xc0c0c0,
    dimensions: [200, 200, 200, 100],
  },
  {
    color: 0xc0c0c0,
    dimensions: [200, 200, 100, 200],
  },
// 
  {
    color: 0xc0c0c0,
    dimensions: [50, 850, 900, 100],
  },
  {
    color: 0xc0c0c0,
    dimensions: [50, 300, 100, 600],
  },
// 
  {
    color: 0xc0c0c0,
    dimensions: [200, 700, 300, 100],
  },
  {
    color: 0xc0c0c0,
    dimensions: [200, 450, 100, 300],
  },
  // 
  {
    color: 0xc0c0c0,
    dimensions: [550, 700, 250, 100],
  },
  {
    color: 0xc0c0c0,
    dimensions: [700, 350, 100, 400],
  },

  {
    color: 0xC1E1C1,
    dimensions: [350, 350, 300, 300],
  },

];

const options = {
  backgroundColor: 0xadd8e6,
};

export function MapChaser({ dimensions, scale }) {
  const mapSize = {
    x: dimensions.x * scale,
    y: dimensions.x * scale,
  };

  return (
    <div>
      <Stage width={mapSize.x} height={mapSize.y} options={options}>
        {/* <Character
          image="map_layout.png"
          start={{ x: 0, y: 0 }}
          scale={scale}
        /> */}
        <PerpetualCharacter
          start={{ x: 200, y: 152 }}
          contolledBy="player"
          image="player.png"
          scale={scale}
          obstacles={obstacles}
        />
 
      </Stage>
    </div>
  );
}

export default MapChaser;

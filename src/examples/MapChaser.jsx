/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Sprite, Stage } from "@inlet/react-pixi";
import { JoyStick } from "../components/JoyStick";
import Character from "../components/Character";
import Environment from "../components/Environment";
import PerpetualCharacter from "../components/PerpetualCharacter";
import { queenSquareMap } from "../mockData/queenSquareMap";

const options = {
  backgroundColor: 0x353734,
};

export function MapChaser({ size, dimensions, scale }) {
  const mapSize = {
    x: size,
    y: size,
  };
  

  return (
    <div>
      <Stage width={mapSize.x} height={mapSize.y} options={options}>
        <PerpetualCharacter
          image="player.png"
          size={size}
          obstacleCells={queenSquareMap}
          spawnCell={[0,0]}
          invert
          cellQuantity={40}


        />
        <Sprite
          image="park_texture.png"
         width={size}
         height={size}
        />
      </Stage>
    </div>
  );
}

export default MapChaser;

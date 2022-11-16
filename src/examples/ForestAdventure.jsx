import {
  Container,
  Sprite,
  Stage,
  TilingSprite,
  useTick,
} from "@inlet/react-pixi";
import { useState } from "react";
import Character from "../components/Character";
import { JoyStick } from "../components/JoyStick";
import { useMovement } from "../utils/useMovement";
import { useTouch } from "../utils/useTouch";

export const BackGround = ({ image, pace }) => {
  const { x, y } = useMovement({ pace, invert: true });
  const { percentage } = useTouch({ size: 40 });

  const xInput = (percentage.x / 100) * pace;
  const yInput = (percentage.y / 100) * pace;

  const [pos, setPos] = useState({ x: 0, y: 0 });

  useTick((delta) => {
    setPos({
      x: pos.x + (x || xInput),
    });
  });

  return (
    <TilingSprite
      image={image}
      width={1000}
      height={160}
      tilePosition={{ x: pos.x, y: pos.y }}
      tileScale={{ x: 1, y: 1 }}
    />
  );
};

export const ForestAdventure = () => {
  const options = {
    backgroundColor: 0xadd8e6,
  };

  return (
    <div>
      <Stage width={1000} height={160} options={options}>
        <BackGround image={"parallax-forest-back-trees.png"} pace={0.3} />
        <BackGround image={"parallax-forest-middle-trees.png"} pace={0.6} />
        <BackGround image={"parallax-forest-front-trees.png"} pace={1} />
        <Container x={150} y={110}>
          <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" />
        </Container>
        <JoyStick />
      </Stage>
    </div>
  );
};

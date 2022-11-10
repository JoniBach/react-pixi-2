/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Container, Graphics, Sprite, Stage, useTick } from "@inlet/react-pixi";
import { useMovement } from "../utils/useMovement";
import { useTouch } from "../utils/useTouch";

const Bunny = () => {
  const pace = 1;
  const { x, y } = useMovement({ pace });
  const { percentage } = useTouch({ size: 40 });

  const xInput = (percentage.x / 100) * pace;
  const yInput = (percentage.y / 100) * pace;

  const [pos, setPos] = useState({ x: 0, y: 0 });

  useTick((delta) => {
    setPos({
      x: pos.x + (x || xInput),
      y: pos.y + (y || yInput),
      //   rotation: Math.sin(i) * Math.PI,
      //   anhor: Math.sin(i / 2),
    });
  });

  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      {...pos}
    />
  );
};

function MovingBunny() {
  const joystickSize = 40;
  const {
    position,
    currentPosition,
    startPosition,
    active,
    positionDifference,
    percentage,
  } = useTouch({ size: joystickSize });

  const props = {
    color: 0x808080,
    x: active ? position.x : startPosition.x,
    y: active ? position.y : startPosition.y,
    height: 20,
    width: 20,
  };
  const boundryProps = {
    color: 0xd0d0d0,
    x: startPosition.x,
    y: startPosition.y,
    height: joystickSize,
    width: joystickSize,
  };

  const joy = useCallback(
    (g) => {
      g.clear();
      g.beginFill(props.color, 0.5);
      g.drawCircle(props.x, props.y, props.height);
      g.endFill();
    },
    [props]
  );

  const boundries = useCallback(
    (g) => {
      g.clear();
      g.beginFill(boundryProps.color, 0.5);
      g.drawCircle(boundryProps.x, boundryProps.y, boundryProps.height);
      g.endFill();
    },
    [boundryProps]
  );

  const ring = useCallback(
    (g) => {
      g.clear();
      g.lineStyle(1, boundryProps.color, 1);
      g.drawCircle(boundryProps.x, boundryProps.y, boundryProps.height);
      g.endFill();
    },
    [boundryProps]
  );

  return (
    <>
      <div>
        <Stage width={800} height={500} options={{ backgroundAlpha: 0 }}>
          <Container x={150} y={150}>
            <Bunny />
          </Container>
       {active && (
        <Container>
               <Graphics draw={boundries} />
          <Graphics draw={joy} />
        </Container>
       )}
          <Graphics draw={ring} />

        </Stage>
      </div>
    </>
  );
}

export default MovingBunny;

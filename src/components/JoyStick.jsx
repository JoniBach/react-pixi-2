import { Container, Graphics } from "@inlet/react-pixi";
import { useCallback } from "react";
import { useTouch } from "../utils/useTouch";

export const JoyStick = ({}) => {
  const joystickSize = 40;

  const {
    position,
    startPosition,
    active,
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
      {active && (
        <Container>
          <Graphics draw={boundries} />
          <Graphics draw={joy} />
        </Container>
      )}
      <Graphics draw={ring} />
    </>
  );
};

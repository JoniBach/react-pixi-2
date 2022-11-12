/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Stage } from "@inlet/react-pixi";
import { JoyStick } from "../components/JoyStick";
import Character from "../components/Character";

const options = {
  backgroundColor: 0xADD8E6
}


export function MovingBunny() {
  return (
      <div>
        <Stage width={300} height={600} options={options}>
          <Container x={150} y={150}>
            <Character  image='https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png'/>
          </Container>
          <JoyStick />
        </Stage>
      </div>
  );
}

export default MovingBunny;

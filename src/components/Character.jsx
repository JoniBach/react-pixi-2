import { Sprite, useTick } from "@inlet/react-pixi";
import { useState } from "react";
import { useMovement } from "../utils/useMovement";
import { useTouch } from "../utils/useTouch";

export const Character = ({image}) => {
    const pace = 2;
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
        image={image}
        {...pos}
      />
    );
  };

  export default Character
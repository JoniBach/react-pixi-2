import { Sprite, useTick } from "@inlet/react-pixi";
import { useState } from "react";
import { useMovement } from "../utils/useMovement";
import { useTouch } from "../utils/useTouch";

export const Character = ({image, start = 0, contolledBy, scale = 1, toggle}) => {
  const pace = 1;
    const { x, y } = useMovement({ pace, toggle: true });
    const { percentage } = useTouch({ size: 40 });
  
    const xInput = (percentage.x / 100) * pace;
    const yInput = (percentage.y / 100) * pace;
  
    const [pos, setPos] = useState({ x: start.x, y: start.y });
  
    useTick((delta) => {
      if (contolledBy === 'player') {
        setPos({
          x: pos.x + (x || xInput),
          y: pos.y + (y || yInput),
        });
      }

    });
  
    return (
      <Sprite
        image={image}
        scale={{ x: scale, y: scale }}
        {...pos}
      />
    );
  };

  export default Character
import { useState } from "react";
import { useKeyPress } from "./useKeyPress";

export const useMovement = ({pace, invert, toggle = false}) => {
    const up = useKeyPress("w");
    const down = useKeyPress("s");
    const left = useKeyPress("a");
    const right = useKeyPress("d");
  
    const diff = (neg, pos) => {
      if (neg && pos) {
        return 0;
      }
      if (neg) {
        if (invert) {
          return pace;

        } else {
          return - pace;

        }
      }
      if (pos) {
        if (invert) {
          return - pace;

        } else {
        return pace;
        }
      }
      return 0;
    };


  
    const y = diff(up, down);
    const x = diff(left, right);
    return { x, y };
  };
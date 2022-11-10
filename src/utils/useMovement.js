import { useKeyPress } from "./useKeyPress";

export const useMovement = ({pace}) => {
    const up = useKeyPress("w");
    const down = useKeyPress("s");
    const left = useKeyPress("a");
    const right = useKeyPress("d");
  
    const diff = (neg, pos) => {
      if (neg && pos) {
        return 0;
      }
      if (neg) {
        return - pace;
      }
      if (pos) {
        return pace;
      }
      return 0;
    };
  
    const y = diff(up, down);
    const x = diff(left, right);
    return { x, y };
  };
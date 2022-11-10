import React, { useEffect, useState } from "react";
import { useKeyPress } from "../utils/useKeyPress";



function Quiz() {
  // Call our hook for each key that we'd like to monitor
  const upPress = useKeyPress("w");
  const leftPress = useKeyPress("a");
  const downPress = useKeyPress("s");
  const rightPress = useKeyPress("d");

  return (
    <div>
      <div>
        {upPress && "up"}
        {downPress && "down"}
        {leftPress && "left"}
        {rightPress && "right"}
      </div>
    </div>
  );
}
export default Quiz;

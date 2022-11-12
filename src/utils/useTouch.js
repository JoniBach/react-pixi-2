import { useEffect, useState } from "react";

const isActive = (str) => {
  switch (str) {
    case "touchstart":
      return true;
    case "touchmove":
      return true;
    case "touchend":
      return false;
    default:
      break;
  }
};

export function useTouch({ size }) {
  const [currentPosition, setcurrentPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setstartPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const positionDifference = {
    y: currentPosition.y - startPosition.y,
    x: currentPosition.x - startPosition.x,
  };

  const dx = currentPosition.x - startPosition.x;
  const dy = currentPosition.y - startPosition.y;

  const rad = Math.atan2(dy, dx);
  const xPos = size * Math.cos(rad);
  const yPos = size * Math.sin(rad);

  const xBoundry = startPosition.x + xPos;
  const yBoundry = startPosition.y + yPos;

  const getXPos = () => {
    if (positionDifference.x === 0) {
      return currentPosition.x;
    } else {
      if (positionDifference.x > 0) {
        return currentPosition.x > xBoundry ? xBoundry : currentPosition.x;
      } else {
        return currentPosition.x < xBoundry ? xBoundry : currentPosition.x;
      }
    }
  };

  const getYPos = () => {
    if (positionDifference.y === 0) {
      return currentPosition.y;
    } else {
      if (positionDifference.y > 0) {
        return currentPosition.y > yBoundry ? yBoundry : currentPosition.y;
      } else {
        return currentPosition.y < yBoundry ? yBoundry : currentPosition.y;
      }
    }
  };

  const x = getXPos();
  const y = getYPos();

  const xPercentage = positionDifference.x === 0 ? 0 : (xPos / size) * 100;
  const yPercentage = positionDifference.y === 0 ? 0 : (yPos / size) * 100;

  const percentage = active
    ? { x: xPercentage, y: yPercentage }
    : { x: 0, y: 0 };

  const direction = (rad / Math.PI) * 180;

  const handlePosition = ({ x, y, type }) => {
    if (type === "touchstart") {
      setstartPosition({ x, y });
      setcurrentPosition({ x, y });
    }
    if (type === "touchmove") {
      setcurrentPosition({ x, y });
    }
    if (type === "touchend") {
      setcurrentPosition({ x, y });
    }
  };

  let touchHandler = function (event) {
    setActive(isActive(event.type));
    if (event.touches && event.touches[0]) {
      handlePosition({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        type: event.type,
      });
    } else if (event.originalEvent && event.originalEvent.changedTouches[0]) {
      handlePosition({
        x: event.originalEvent.changedTouches[0].clientX,
        y: event.originalEvent.changedTouches[0].clientY,
        type: event.type,
      });
    } else if (event.clientX && event.clientY) {
      handlePosition({
        x: event.client,
        y: event.clientY,
        type: event.type,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("touchstart", touchHandler, false);
    window.addEventListener("touchmove", touchHandler, false);
    window.addEventListener("touchend", touchHandler, false);

    return () => {
      window.addEventListener("touchstart", touchHandler, false);
      window.addEventListener("touchmove", touchHandler, false);
      window.addEventListener("touchend", touchHandler, false);
    };
  }, []);
  
  return {
    position: { x, y },
    currentPosition,
    startPosition,
    active,
    direction,
    positionDifference,
    percentage,
  };
}

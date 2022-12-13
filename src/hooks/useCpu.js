import { useRef, useState } from "react";

export const useCpu = ({ gridSize, maxGridSize }) => {
  const [cpuPosition, setCpuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [cpuDirection, setCpuDirection] = useState("");
  const [cpuSpawnCell, setcpuSpawnCell] = useState({});

  const cellSize = maxGridSize / gridSize;

  const cpuRef = useRef(null);

  const loadCpu = ({ x, y }) => {
    setcpuSpawnCell({ x, y });
    const startPos = {
      x: x * cellSize,
      y: y * cellSize,
    };
    setCpuPosition(startPos);
  };

  const respawnCpu = () => setCpuPosition(cpuSpawnCell);

  const cpu = {
    // var
    cpuPosition,
    cpuDirection,
    cpuRef,

    // funcs
    respawnCpu,
    loadCpu
  };

  return cpu;
};

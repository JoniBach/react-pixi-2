import { createContext, useContext, useState } from "react";
import { useMovement } from "../utils/useMovement";
import { useTouch } from "../utils/useTouch";

export const ControllerContext = createContext();

export function useController() {
  return useContext(ControllerContext);
}

export const ControllerContextProvider = ({ children }) => {
  const [activeController, setActiveController] = useState("");
  console.log('test')


  return (
    <ControllerContext.Provider
      value={{
        activeController,
   
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};

import { useEffect, useState } from "react";

export function useMouseEvent() {
	// State for keeping track of whether key is pressed
	const [keyPressed, setKeyPressed] = useState(false);
	// If pressed key is our target key then set to true
	function downHandler({ key }) {
	//   if (key === targetKey) {
		setKeyPressed(true);
	//   }
	}
    
	// If released key is our target key then set to false
	const upHandler = ({ key }) => {
	//   if (key === targetKey) {
		setKeyPressed(false);
	//   }
	};
	// Add event listeners
	useEffect(() => {
	  window.addEventListener("mousedown", downHandler);
	  window.addEventListener("mouseup", upHandler);

	  // Remove event listeners on cleanup
	  return () => {
		window.removeEventListener("mousedown", downHandler);
		window.removeEventListener("mouseup", upHandler);
	  };
	}, []); // Empty array ensures that effect is only run on mount and unmount
	return keyPressed;
  }
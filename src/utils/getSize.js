const baseSize =
  window.innerHeight > window.innerWidth
    ? window.innerWidth
    : window.innerHeight;
export const getSize = Math.floor(baseSize / 100) * 100;

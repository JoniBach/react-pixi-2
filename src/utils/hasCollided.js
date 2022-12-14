export const hasCollided = (first, second, size) => {
  if (
    first.x + size > second.x &&
    first.x < second.x + size &&
    first.y + first.height > second.y &&
    first.y < second.y + second.height
  )
    return true;
  return false;
};


export const willColide = (a, b) => {
    var ab = a
    var bb = b

    const base = false;

    const safe = 2;
    const buffer = 4;

    if (
      ab.x + ab.width - safe > bb.x &&
      ab.x < bb.x + bb.width - safe &&
      ab.y + buffer + ab.height - safe > bb.y &&
      ab.y < bb.y + bb.height - safe
    ) {
      return "down";
    }
    if (
      ab.x + ab.width - safe > bb.x &&
      ab.x < bb.x + bb.width - safe &&
      ab.y + ab.height - safe > bb.y &&
      ab.y - buffer < bb.y + bb.height - safe
    ) {
      return "up";
    }
    if (
      ab.x + buffer + ab.width - safe > bb.x &&
      ab.x < bb.x + bb.width - safe &&
      ab.y + ab.height - safe > bb.y &&
      ab.y < bb.y + bb.height - safe
    ) {
      return "right";
    }
    if (
      ab.x + ab.width - safe > bb.x &&
      ab.x - buffer < bb.x + bb.width - safe &&
      ab.y + ab.height - safe > bb.y &&
      ab.y < bb.y + bb.height - safe
    ) {
      return "left";
    }
    return base;
  };


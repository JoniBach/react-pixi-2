export const ClickyCell = ({ size, handleClick, checkCellExists, cell, color ='#374151' }) => {

  return (
    <div
      className={`select-none border-solid border-2 border-gray-500 `}
      style={{ width: size, height: size, backgroundColor: color }}
      onMouseEnter={(e) => handleClick(cell, e)}
      onMouseDown={(e) => handleClick(cell, e)}
    >
      {/* <div className="self-center align-middle w-full text-center">
      {color}
      </div> */}
    </div>
  );
};

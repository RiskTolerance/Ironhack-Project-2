import React from "react";

export const DoneButton = props => {
  let themeColor = props.userColors[3]
    ? `rgb(${props.userColors[3][0]},${props.userColors[3][1]},${props.userColors[3][2]})`
    : [102, 255, 204];

  return (
    <button
      className='doneButton'
      type='button'
      style={{
        backgroundColor: `${themeColor}`
      }}
    >
      Done!
    </button>
  );
};

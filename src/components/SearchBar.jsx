import React, { useState } from "react";

export const SearchBar = props => {
  let themeColor = props.userColors[3]
    ? `rgb(${props.userColors[3][0]},${props.userColors[3][1]},${props.userColors[3][2]})`
    : [102, 255, 204];

  const [term, setTerm] = useState("");
  console.log("term", term);
  return (
    <>
      <form className='searchForm' onSubmit={props.userSubmit(term)}>
        <input
          className='searchInput'
          type='text'
          onChange={e => setTerm(e.target.value)}
          placeholder='¯\_(ツ)_/¯'
          style={{
            borderColor: `${themeColor}`
          }}
        ></input>
      </form>
    </>
  );
};

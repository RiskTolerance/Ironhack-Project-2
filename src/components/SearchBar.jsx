import React, { useState } from "react";

export const SearchBar = props => {
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
        ></input>
      </form>
    </>
  );
};

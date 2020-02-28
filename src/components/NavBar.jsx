import React from "react";
import { Link } from "react-router-dom";

export const NavBar = props => {
  let themeColor = props.userColors[3]
    ? `rgb(${props.userColors[3][0]},${props.userColors[3][1]},${props.userColors[3][2]})`
    : [102, 255, 204];

  return (
    <div
      className='navBar'
      style={{
        backgroundColor: `${themeColor}`
      }}
    >
      <Link to='/'>
        <img className='logo' src='./img/Logo.svg' alt='page logo' />
      </Link>
      <h4 className='navInstruction'>{props.pageInstructions}</h4>
      <h1 className='titleText'>{props.pageTitle}.</h1>
    </div>
  );
};

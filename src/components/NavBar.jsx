import React from "react";
import { Link } from "react-router-dom";

export const NavBar = props => {
  return (
    <div className='navBar'>
      <Link to='/'>
        <img className='logo' src='./img/Logo.svg' alt='page logo' />
      </Link>
      <h4 className='navInstruction'>{props.pageInstructions}</h4>
      <h1 className='titleText'>{props.pageTitle}.</h1>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { DoneButton } from "./DoneButton";

export const HeroSelect = props => {
  props.setTitle("Hero Select");
  props.setInstructions("Choose a hero image to extract colors from");
  return (
    <div>
      <Link to='moodboard'>
        <DoneButton />
      </Link>
    </div>
  );
};

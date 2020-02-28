import React from "react";
import { Link } from "react-router-dom";
import { DoneButton } from "./DoneButton";
import { HeroSelectOptions } from "./HeroSelectOptions";

export const HeroSelect = props => {
  props.setTitle("Hero Select");
  props.setInstructions("Choose a hero image to extract colors from");
  return (
    <div>
      <HeroSelectOptions
        userImages={props.userImages}
        setHero={props.setHero}
        userColors={props.userColors}
      />
      <Link to='moodboard'>
        <DoneButton />
      </Link>
    </div>
  );
};

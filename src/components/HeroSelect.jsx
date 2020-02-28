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
      <div className='swatchContainer'>
        <div className='swatches'>
          {props.userColors.map(eachColor => {
            //console.log(eachColor);
            let style = {
              backgroundColor: `rgb(${eachColor[0]},${eachColor[1]},${eachColor[2]})`
            };
            //console.log(style);
            return (
              <div className='swatchColor'>
                <div style={style} className='swatch'></div>
                <div className='swatchName'>
                  RGB ({eachColor[0]},{eachColor[1]},{eachColor[2]})
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Link to='moodboard'>
        <DoneButton />
      </Link>
    </div>
  );
};

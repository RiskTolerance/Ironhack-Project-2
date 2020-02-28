import React from "react";

export const HeroImageCard = props => {
  console.log(props);
  return (
    <div className='heroImageCard'>
      <img
        onClick={() => props.setHero(props.image)}
        className='heroImage'
        name={props}
        src={props.image.urls.regular}
        alt={props.alt_description}
      />
      <div className='swatches'>
        {props.userColors.map(eachColor => {
          console.log(eachColor);
          let style = {
            backgroundColor: `rgb(${eachColor[0]},${eachColor[1]},${eachColor[2]})`
          };
          console.log(style);
          return <div style={style} className='swatch1' />;
        })}
      </div>
    </div>
  );
};

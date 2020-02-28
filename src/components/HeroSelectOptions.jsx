import React from "react";
import { HeroImageCard } from "./HeroImageCard";

export const HeroSelectOptions = props => {
  const imgs = props.userImages.map(img => {
    return (
      <HeroImageCard
        key={img.id}
        userImages={props.userImages}
        setHero={props.setHero}
        image={img}
        userColors={props.userColors}
      />
    );
  });

  return <div className='heroImageContainer'>{imgs}</div>;
};

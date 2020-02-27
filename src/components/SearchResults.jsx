import React from "react";
import { ImageCard } from "./ImageCard";

export const SearchResults = props => {
  const imgs = props.foundImages.map(img => {
    return (
      <ImageCard
        key={img.id}
        foundImages={props.foundImages}
        onImageSelect={props.onImageSelect}
        image={img}
      />
    );
  });

  return <div className='innerSearchResults'>{imgs}</div>;
};

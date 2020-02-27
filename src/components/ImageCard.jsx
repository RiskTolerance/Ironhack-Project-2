import React from "react";

export const ImageCard = props => {
  return (
    <div className='returnedImageCard'>
      <img
        onClick={() => props.onImageSelect(props.image)}
        className='returnedImage'
        name={props}
        src={props.image.urls.regular}
        alt={props.alt_description}
      />
    </div>
  );
};

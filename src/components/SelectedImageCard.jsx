import React from "react";

export const SelectedImageCard = props => {
  return (
    <div className='userSelectedImageCard'>
      <img
        onClick={() => props.imageDelete(props.image)}
        className='returnedUserImage'
        name={props}
        src={props.image.urls.regular}
        alt={props.alt_description}
      />
      {/* <div className='swatches'>
        <div className='swatch1' />
        <div className='swatch2' />
        <div className='swatch3' />
        <div className='swatch4' />
        <div className='swatch5' />
      </div> */}
    </div>
  );
};

import React from "react";
import { SelectedImageCard } from "./SelectedImageCard";

export const SelectedImages = props => {
    const imgs = props.userImages.map(img => {
      return (
        <SelectedImageCard
          key={img.id}
          userImages={props.userImages}
          imageDelete={props.imageDelete}
          image={img}
        />
      );
    });
  
    return <div className='innerSearchResults'>{imgs}</div>;
  };

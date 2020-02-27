import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { SelectedImages } from "./SelectedImages";
import { DoneButton } from "./DoneButton";

export const ImageSelect = props => {
  props.setTitle("Image Select");
  props.setInstructions(
    "Select up to 8 images which best represent your brand"
  );
  return (
    <div className='contentPosition'>
      <div className='imageSelect'>
        <div className='imageSelectLeft'>
          <div className='searchBar'>
            <SearchBar userSubmit={props.userSubmit} />
          </div>
          <div className='searchResults'>
            <SearchResults
              foundImages={props.foundImages}
              onImageSelect={props.onImageSelect}
            />
          </div>
        </div>
        <div className='imageSelectRight'>
          <div className='selectedImages'>
            <SelectedImages 
              userImages={props.userImages}
              imageDelete={props.imageDelete}
            />
          </div>
          <div className='doneButtonContainer'>
            <Link to='heroselect'>
              <DoneButton />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

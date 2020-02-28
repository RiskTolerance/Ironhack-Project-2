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

  let themeColor = props.userColors[3]
    ? `rgb(${props.userColors[3][0]},${props.userColors[3][1]},${props.userColors[3][2]})`
    : [102, 255, 204];

  return (
    <div className='contentPosition'>
      <div className='imageSelect'>
        <div className='imageSelectLeft'>
          <div className='searchBar'>
            <SearchBar
              userSubmit={props.userSubmit}
              userColors={props.userColors}
            />
          </div>
          <div
            className='searchResults'
            style={{
              borderColor: `${themeColor}`
            }}
          >
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
              <DoneButton userColors={props.userColors} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

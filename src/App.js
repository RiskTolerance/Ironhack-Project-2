import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { HeroSelect } from "./components/HeroSelect";
import { ImageSelect } from "./components/ImageSelect";
import { MoodBoard } from "./components/MoodBoard";
import { Footer } from "./components/Footer";
import axios from "axios";
import Color from "color";
import Clarifai from "clarifai";

export const App = () => {
  const [state, setState] = useState({ images: [] });

  const [userImages, setUserImages] = useState({ foundImages: [] });

  const [bgImage, setBgImage] = useState(
    "https://images.unsplash.com/photo-1501769214405-5e5ee5125a02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1996&q=80"
  );

  const [heroImage, setHeroImage] = useState("");

  const [userColors, setUserColors] = useState([]);

  const clarifaiApp = new Clarifai.App({
    apiKey: "4611dc593f3a4e6f9263b4d5d8bc2cf5"
  });

  const onSearchSubmit = term => async e => {
    e.preventDefault();
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
      headers: {
        Authorization: "Client-ID TtS2bikKlujVBUuPAb6KYXZXPeAxw-3tHLY48O6OlYc"
      }
    });
    //console.log(response);
    setState({ ...state, images: response.data.results });
  };

  const returnPalette = async returnedColors => {
    let rgbColors = returnedColors.map(eachColor => {
      console.log(eachColor);
      return Color(eachColor.raw_hex)
        .rgb()
        .array();
    });
    console.log(rgbColors);
    var url = "http://colormind.io/api/";
    var data = {
      model: "default",
      input: rgbColors
    };

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        var palette = JSON.parse(http.responseText).result;
        console.log(palette);
        setUserColors(palette);
      }
    };

    http.open("POST", url, true);
    http.send(JSON.stringify(data));
  };

  const getImageColors = async url => {
    console.log(url);
    const response = await clarifaiApp.models
      .predict("eeed0b6733a644cea07cf4c60f87ebb7", url)
      .then(
        function(response) {
          console.log("I found some colors for you!");
          console.log(response.rawData.outputs[0].data.colors);
          let sortedColors = response.rawData.outputs[0].data.colors.sort(
            (a, b) => {
              if (a.value > b.value) {
                return -1;
              } else if (a.value < b.value) {
                return 1;
              } else {
                return 0;
              }
            }
          );
          console.log(sortedColors);
          returnPalette(sortedColors);
          //now we need to convert the colors to RGB
        },
        function(err) {
          console.log("I couldn't find any colors :(");
        }
      );
  };

  const onImagesSelect = img => {
    if (userImages.foundImages.length <= 7) {
      console.log(img);
      //getImageColors(img.urls.regular);
      setUserImages({ foundImages: [...userImages.foundImages, img] });
      console.log(img.id);
      console.log(userImages.foundImages);
    } else {
      console.log("you cannont add anymore images!");
    }
  };

  const imageDelete = img => {
    console.log(`delete this`);
    let deleteIndex = [...userImages.foundImages].indexOf(img);
    let newIndex = [...userImages.foundImages].splice(deleteIndex, 1);
    //setUserImages(newIndex);
    console.log(newIndex);
  };

  const setHero = img => {
    setHeroImage(img.urls.full);
    setBgImage('');
    getImageColors(img.urls.regular);
  };

  const [title, setTitle] = useState("Select Images");
  const titleSet = title => setTitle(title);

  const [instructions, setInstructions] = useState(
    "Select up to 8 images which best represent your brand"
  );
  const instructionsSet = instructions => setInstructions(instructions);

  return (
    <div>
      <div
        className='bg'
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      <div className='app' style={{ backgroundImage: `url(${bgImage})` }}>
        {/* Nav bar */}
        <Route
          render={props => (
            <NavBar
              {...props}
              pageTitle={title}
              pageInstructions={instructions}
              userColors={userColors}
            />
          )}
        />

        {/* Home */}
        <Switch>
          <Route
            exact
            path='/'
            render={props => (
              <ImageSelect
                {...props}
                setTitle={titleSet}
                setInstructions={instructionsSet}
                userSubmit={onSearchSubmit}
                onImageSelect={onImagesSelect}
                imageDelete={imageDelete}
                foundImages={state.images}
                userImages={userImages.foundImages}
                userColors={userColors}
              />
            )}
          />
        </Switch>

        {/* select Hero image */}
        <Switch>
          <Route
            exact
            path='/heroselect'
            render={props => (
              <HeroSelect
                {...props}
                setTitle={titleSet}
                setInstructions={instructionsSet}
                userImages={userImages.foundImages}
                setHero={setHero}
                userColors={userColors}
              />
            )}
          />
          />
        </Switch>

        {/* Final Moodboard */}
        <Switch>
          <Route
            exact
            path='/moodboard'
            render={props => (
              <MoodBoard
                {...props}
                setTitle={titleSet}
                setInstructions={instructionsSet}
              />
            )}
          />
        </Switch>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { HeroSelect } from "./components/HeroSelect";
import { ImageSelect } from "./components/ImageSelect";
import { MoodBoard } from "./components/MoodBoard";
import { Footer } from "./components/Footer";
import axios from "axios";
import Clarifai from "clarifai";

export const App = () => {
  const [state, setState] = useState({ images: [] });

  const [userImages, setUserImages] = useState({ foundImages: [] });

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

  const onHeroSelect = async () => {
    const response = await clarifaiApp.models
      .predict(
        "eeed0b6733a644cea07cf4c60f87ebb7",
        "https://images.unsplash.com/photo-1523585895729-a4bb980d5c14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80"
      )
      .then(
        function(response) {
          console.log("I found some colors for you!");
          console.log(response.rawData.outputs[0].data.colors);
        },
        function(err) {
          console.log("I couldn't find any colors :(");
        }
      );
  };

  const returnPalette = async () => {
    var url = "http://colormind.io/api/";
    var data = {
      model: "default",
      input: [[44, 43, 44], [90, 83, 82], "N", "N", "N"]
    };

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
        var palette = JSON.parse(http.responseText).result;
        console.log(palette);
      }
    };

    http.open("POST", url, true);
    http.send(JSON.stringify(data));
  };

  const onImagesSelect = img => {
    if (userImages.foundImages.length <= 7) {
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

  const [title, setTitle] = useState("Select Images");
  const titleSet = title => setTitle(title);

  const [instructions, setInstructions] = useState(
    "Select up to 8 images which best represent your brand"
  );
  const instructionsSet = instructions => setInstructions(instructions);

  return (
    <div className='app'>
      {/* Nav bar */}
      <Route
        render={props => (
          <NavBar
            {...props}
            pageTitle={title}
            pageInstructions={instructions}
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
  );
};

export default App;

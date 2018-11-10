import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Hls from "hls.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // url: "http://techslides.com/demos/sample-videos/small.mp4"
      url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
    };

    this.playPause = this.playPause.bind(this);
    this.muteVolume = this.muteVolume.bind(this);
  }

  async playPause() {
    var video = document.getElementById("video");
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    var playPauseButton = document.getElementById("play-pause-button");
    console.log(playPauseButton.classList.value)

    //checking the current className and toggling

    if(playPauseButton.classList.value === "play-button"){
      playPauseButton.classList.remove("play-button");
      playPauseButton.classList.add("pause-button");
    }else{
      playPauseButton.classList.remove("pause-button");
      playPauseButton.classList.add("play-button")
    }

  }

  muteVolume() {
    var video = document.getElementById("video");
    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    }

    //checking the current className and toggling
    var muteUnmuteButton = document.getElementById("mute-unmute-button");
    if(muteUnmuteButton.classList.value === "unmute-button"){
      muteUnmuteButton.classList.remove("unmute-button");
      muteUnmuteButton.classList.add("mute-button")
    }else{
      muteUnmuteButton.classList.remove("mute-button");
      muteUnmuteButton.classList.add("unmute-button")
    }
  }

  componentDidMount() {
    var video = document.getElementById("video");

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(this.state.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = this.state.url;
      video.addEventListener("loadedmetadata", function() {
        video.play();
      });
    }
  }

  render() {
    return (
      <div className="App">
        <video id="video" width="400" controls/>

        <br />
        <div className = "control-button">
        <button id ="play-pause-button" className="play-button" onClick={this.playPause}>
        </button>
        <button id= "mute-unmute-button" className="unmute-button" onClick={this.muteVolume}>
        </button>
        </div>
        <div>
          <h5>Select Video Quality</h5>
          <select>
            <option value="360p">360p</option>
            <option value="480p">480p</option>
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
          </select>
        </div>
      </div>
    );
  }
}

export default App;

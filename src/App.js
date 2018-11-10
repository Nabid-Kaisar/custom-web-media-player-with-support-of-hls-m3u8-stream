import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Hls from "hls.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // url: "http://techslides.com/demos/sample-videos/small.mp4"
      //url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
      url: "https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8"
    };

    this.playPause = this.handlePlayPause.bind(this);
    this.muteVolume = this.handleMuteVolume.bind(this);
    this.handleSetting = this.handleSetting.bind(this);
    this.handleMinMax = this.handleMinMax.bind(this);
    this.handlePip = this.handlePip.bind(this);
  }

  async handlePlayPause() {
    var video = document.getElementById("video");
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    var playPauseButton = document.getElementById("play-pause-button");
    console.log(playPauseButton.classList.value);

    //checking the current className and toggling

    if (playPauseButton.classList.value === "play-button") {
      playPauseButton.classList.remove("play-button");
      playPauseButton.classList.add("pause-button");
    } else {
      playPauseButton.classList.remove("pause-button");
      playPauseButton.classList.add("play-button");
    }
  }

  handleMuteVolume() {
    var video = document.getElementById("video");
    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    }

    //checking the current className and toggling
    var muteUnmuteButton = document.getElementById("mute-unmute-button");
    if (muteUnmuteButton.classList.value === "unmute-button") {
      muteUnmuteButton.classList.remove("unmute-button");
      muteUnmuteButton.classList.add("mute-button");
    } else {
      muteUnmuteButton.classList.remove("mute-button");
      muteUnmuteButton.classList.add("unmute-button");
    }
  }

  handleSetting() {
    //fetch current video quality and show it in here..

    var dropdown = document.getElementById("quality-drop-down");
    dropdown.classList.toggle("show");
    //clicking on outside closes the dropdown window
    window.onclick = function(event) {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
  }

  handleMinMax() {
    var video = document.getElementById("video");
    //checking if video running full screen or not
    if(!video.webkitDisplayingFullscreen){
      if (video.requestFullscreen) video.requestFullscreen();
      //adding supports for all browsers
      else if (video.msRequestFullscreen) video.msRequestFullscreen();
      else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
      else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    }else{
      //*** have to check other browser's compatibility
      document.webkitExitFullscreen();
    }
  }

  handlePip(){
    var video = document.getElementById("video");
    video.requestPictureInPicture();
  }


  componentDidMount() {
    //using hls.js to convert m3u8 format to mp4
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
        <video id="video" width="400" controls autoPlay />

        <br />
        <div className="control-button">
          <button
            id="play-pause-button"
            className="pause-button"
            onClick={this.handlePlayPause}
          />
          <button
            id="mute-unmute-button"
            className="unmute-button"
            onClick={this.handleMuteVolume}
          />
          <button
            id="setting"
            className="dropbtn"
            onClick={this.handleSetting}
          />
          <div id="quality-drop-down" className="dropdown-content">
            <ul>360p</ul>
            <ul>480p</ul>
            <ul>720p</ul>
          </div>
          <button
            id="minimize-maximize"
            className="maximize-button"
            onClick={this.handleMinMax}
          />
          <button id = "pip"
          className = "pip-button"
          onClick = {this.handlePip}
          />
        </div>

        <div>
          <h5>Select Video Quality</h5>
          <select id="setting-button">
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

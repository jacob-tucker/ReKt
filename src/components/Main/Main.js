import React, { useState } from 'react';
import './Main.css'

import Moment from './Moment/Moment'

const Main = (props) => {
  const [videoTitle, setVideoTitle] = useState('')
  const [gameCategory, setGameCategory] = useState('')
  const [videoName, setVideoName] = useState('')

  const callCaptureFile = (event) => {
    setVideoName(event.target.files[0].name)
    props.captureFile(event)
  }

  return (
    <div className="main">
      <div className="main_video_list">
        {props.videos.map((video, key) => {
          return (
            <Moment key={key} video={video} />
          )
        })}
      </div>

      <div className="upload_video">
        <form onSubmit={(event) => {
          event.preventDefault()
          if (videoTitle.length > 50) window.alert('Your title is too long. Please keep it to 50 characters.')
          else props.uploadVideo(videoTitle, gameCategory);
        }} >
          <h5>Upload Video</h5>
          <div className="middleSection">
            <div className="step">
              <p>1) </p>
              <label htmlFor="upload_button" className="upload_button_label">Select File</label>
              <input id="upload_button" type='file' accept=".mp4, .mkv .ogg .wmv" onChange={callCaptureFile} />
            </div>
            <div className="step">
              <p>2) </p>
              <input type="text" placeholder="Title..." onChange={(input) => setVideoTitle(input.target.value)} required></input>
            </div>
            <div className="step">
              <p>3) </p>
              <select defaultValue={'DEFAULT'} name="games" id="games" onChange={(input) => setGameCategory(input.target.value.toString())} required>
                <option value="DEFAULT" disabled>Game Category</option>
                <option value="League of Legends">League of Legends</option>
                <option value="Minecraft">Minecraft</option>
                <option value="Rocket League">Rocket League</option>
                <option value="Valorant">Valorant</option>
                <option value="CSGO">CSGO</option>
                <option value="Fortnite">Fortnite</option>
                <option value="Apex Legends">Apex Legends</option>
              </select>
            </div>
            <div className="step">
              <p className="videoName">{videoName}</p>
            </div>
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );

}

export default Main;
import React, { useState } from 'react';
import './Moment.css'

const Moment = (props) => {

    return (
        <div className="moment">
            <video src={`https://ipfs.infura.io/ipfs/${props.video.hash}`} controls></video>
            <div className="video_information">

                <p className="moment_game">{props.video.game}</p>
                <p className="moment_title">{props.video.title}</p>

                <p className="moment_author"><span style={{ color: 'white' }}>Author:</span> {props.video.author}</p>
            </div>
        </div>
    );
}

export default Moment;
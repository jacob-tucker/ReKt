import React, { useState, useEffect } from 'react'
import './Game.css'
import Main from '../../Main/Main';

const Game = (props) => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        console.log(props.location.state.image)
        if (props.contract) retrieveVideos();
    }, [props])

    async function retrieveVideos() {
        setVideos(await getVideos(props.location.state.game));
    }

    async function getVideos(game) {
        let theVideos = await props.contract.methods.returnVideosInGame(game).call();
        console.log(theVideos);
        return theVideos;
    }

    return (
        <div className="game">
            <div className="game_description">
                <img src={props.location.state.image} />
                <div className="game_description_left">
                    <h3>{props.location.state.game}</h3>
                    <p>{props.location.state.number} Moments</p>
                </div>
                <div className="game_description_right">
                    <p>League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other’s base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.
                    </p>
                </div>
            </div>
            <div className="gamepage_list">
                <Main captureFile={props.captureFile} uploadVideo={props.uploadVideo} videos={videos} />
            </div>
        </div>

    )
}

export default Game;
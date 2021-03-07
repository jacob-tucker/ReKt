import React, { useState, useEffect } from 'react'
import './Game.css'
import Main from '../../Main/Main';
import leagueImage2 from '../../../Resources/league_wallpaper.jpg';
import rocketleagueImage2 from '../../../Resources/rocketleague_wallpaper.jpg'
import valorantImage2 from '../../../Resources/valorant_wallpaper.jpg'
import minecraftImage2 from '../../../Resources/minecraft_wallpaper.png'
import fortniteImage2 from '../../../Resources/fortnite_wallpaper.jpg'
import csgoImage2 from '../../../Resources/csgo_wallpaper.png'
import apexImage2 from '../../../Resources/apex_wallpaper.jpg'
import overwatchImage2 from '../../../Resources/overwatch_wallpaper.jpg'

const Game = (props) => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        console.log(props)
        if (props.contract) retrieveVideos();
    }, [props])

    async function retrieveVideos() {
        setVideos(await getVideos(props.match.params.game));
    }

    async function getVideos(game) {
        let theVideos = await props.contract.methods.returnVideosInGame(game).call();
        console.log(theVideos);
        let newTheVideos = theVideos.slice(0).reverse()
        return newTheVideos;
    }

    return (
        <div className="game">
            <div className="game_description">
                {props.match.params.game === "League of Legends"
                    ? <img src={leagueImage2} alt="league of legends" />
                    : props.match.params.game === "Rocket League"
                        ? <img src={rocketleagueImage2} alt="rocket league" />
                        : props.match.params.game === "Valorant"
                            ? <img src={valorantImage2} alt="valorant" />
                            : props.match.params.game === "Minecraft"
                                ? <img src={minecraftImage2} alt="minecraft" />
                                : props.match.params.game === "Fortnite"
                                    ? <img src={fortniteImage2} alt="fortnite" />
                                    : props.match.params.game === "CSGO"
                                        ? <img src={csgoImage2} alt="csgo" />
                                        : props.match.params.game === "Apex Legends"
                                            ? <img src={apexImage2} alt="apex legends" />
                                            : props.match.params.game === "Overwatch"
                                                ? <img src={overwatchImage2} alt="overwatch" />
                                                : null

                }
                <div className="game_description_left">
                    <h3>{props.match.params.game}</h3>
                    <p>{videos.length} Moments</p>
                </div>
                <div className="game_description_right">
                    {props.match.params.game === "League of Legends"
                        ? <p>League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other’s base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.</p>
                        : props.match.params.game === "Rocket League"
                            ? <p>Rocket League is a high-powered hybrid of arcade-style soccer and vehicular mayhem with easy-to-understand controls and fluid, physics-driven competition.</p>
                            : props.match.params.game === "Valorant"
                                ? <p>Valorant is your global competitive stage. It’s a 5v5 tac-shooter matchup to plant or defuse the Spike in a one-life-per-round, first to 13 series. More than guns and bullets, you’ll choose an Agent armed with adaptive, swift, and lethal abilities that create opportunities to let your gunplay shine. Creativity is your greatest weapon.</p>
                                : props.match.params.game === "Minecraft"
                                    ? <p>Prepare for an adventure of limitless possibilities as you build, mine, battle mobs, and explore the ever-changing Minecraft landscape.</p>
                                    : props.match.params.game === "Fortnite"
                                        ? <p>Fortnite is the completely free multiplayer game where you and your friends collaborate to create your dream Fortnite world or battle to be the last one standing.</p>
                                        : props.match.params.game === "CSGO"
                                            ? <p>Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).</p>
                                            : props.match.params.game === "Apex Legends"
                                                ? <p>Show ‘em what you’re made of in Apex Legends, a free-to-play Battle Royale game where contenders from across the Frontier team up to battle for glory, fame, and fortune.</p>
                                                : props.match.params.game === "Overwatch"
                                                    ? <p>Overwatch is a colorful team-based shooter game starring a diverse cast of powerful heroes. Travel the world, build a team, and contest objectives in exhilarating 6v6 combat.</p>
                                                    : null

                    }
                </div>
            </div>
            <div className="gamepage_list">
                <Main captureFile={props.captureFile} uploadVideo={props.uploadVideo} videos={videos} />
            </div>
        </div>

    )
}

export default Game;
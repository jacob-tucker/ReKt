import React, { useState, useEffect } from 'react';
import './Games.css'
import '../Main/Main.css'
import { Link } from 'react-router-dom'
import leagueImage from './league_wallpaper.jpg';
import rocketleagueImage from './rocketleague_wallpaper.jpg';
import valorantImage from './valorant_wallpaper.jpg';
import minecraftImage from './minecraft_wallpaper.png';
import fortniteImage from './fortnite_wallpaper.jpg';
import csgoImage from './csgo_wallpaper.png';
import apexImage from './apex_wallpaper.jpg';

const Games = (props) => {
    const [numMoments, setNumMoments] = useState([])
    useEffect(() => {
        if (props.contract) retrieveNumbers();
    }, [props])

    async function retrieveNumbers() {
        let arrayOfNumMoments = [];
        arrayOfNumMoments.push(await getNumbers("League of Legends"));
        arrayOfNumMoments.push(await getNumbers("Rocket League"));
        arrayOfNumMoments.push(await getNumbers("Valorant"));
        arrayOfNumMoments.push(await getNumbers("Minecraft"));
        arrayOfNumMoments.push(await getNumbers("Fortnite"));
        arrayOfNumMoments.push(await getNumbers("CSGO"));
        arrayOfNumMoments.push(await getNumbers("Apex Legends"));
        setNumMoments(arrayOfNumMoments)
    }

    async function getNumbers(game) {
        let count = await props.contract.methods.returnVideosInGame(game).call();
        return count.length;
    }

    return (
        <div className="games">
            <div className="games_list">
                <div className="game_element">
                    <img src={leagueImage} alt="league_wallpaper" />
                    <p>League of Legends</p>
                    <p>{numMoments[0]} Moments</p>
                    <Link
                        to={{
                            pathname: "/games/league-of-legends",
                            state: { game: "League of Legends", image: leagueImage, number: numMoments[0] }
                        }}
                    >Explore</Link>
                </div>
                <div className="game_element">
                    <img src={rocketleagueImage} alt="rocketleague_wallpaper" />
                    <p>Rocket League</p>
                    <p>{numMoments[1]} Moments</p>
                    <Link>Explore</Link>
                </div>
                <div className="game_element">
                    <img src={valorantImage} alt="valorant_wallpaper" />
                    <p>Valorant</p>
                    <p>{numMoments[2]} Moments</p>
                    <Link>Explore</Link>
                </div>
                <div className="game_element">
                    <img src={minecraftImage} alt="minecraft_wallpaper" />
                    <p>Minecraft</p>
                    <p>{numMoments[3]} Moments</p>
                    <Link>Explore</Link>
                </div>
                <div className="game_element">
                    <img src={fortniteImage} alt="fortnite_wallpaper" />
                    <p>Fortnite</p>
                    <p>{numMoments[4]} Moments</p>
                    <Link>Explore</Link>
                </div>
                <div className="game_element">
                    <img src={csgoImage} alt="csgo_wallpaper" />
                    <p>CSGO</p>
                    <p>{numMoments[5]} Moments</p>
                    <Link>Explore</Link>
                </div>
                <div className="game_element">
                    <img src={apexImage} alt="apex_wallpaper" />
                    <p>Apex Legends</p>
                    <p>{numMoments[6]} Moments</p>
                    <Link>Explore</Link>
                </div>
                <div className="game_element">

                </div>





            </div>
            <div className="popular_games">
                <h5>Most Popular Games</h5>
            </div>
        </div>
    );
}

export default Games;
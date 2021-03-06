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
    const [numMoments, setNumMoments] = useState(null)
    const [populars, setPopulars] = useState([])
    useEffect(() => {
        if (props.contract) retrieveNumbers();
    }, [props])

    async function retrieveNumbers() {
        let arrayOfNumMoments = [];
        arrayOfNumMoments.push({ game: "League of Legends", image: leagueImage, number: await getNumbers("League of Legends") });
        arrayOfNumMoments.push({ game: "Rocket League", image: rocketleagueImage, number: await getNumbers("Rocket League") });
        arrayOfNumMoments.push({ game: "Valorant", image: valorantImage, number: await getNumbers("Valorant") });
        arrayOfNumMoments.push({ game: "Minecraft", image: minecraftImage, number: await getNumbers("Minecraft") });
        arrayOfNumMoments.push({ game: "Fortnite", image: fortniteImage, number: await getNumbers("Fortnite") });
        arrayOfNumMoments.push({ game: "CSGO", image: csgoImage, number: await getNumbers("CSGO") });
        arrayOfNumMoments.push({ game: "Apex Legends", image: apexImage, number: await getNumbers("Apex Legends") });
        arrayOfNumMoments.sort(function (a, b) { return b.number - a.number })
        setNumMoments(arrayOfNumMoments);
    }

    async function getNumbers(game) {
        let count = await props.contract.methods.returnVideosInGame(game).call();
        return count.length;
    }

    return (
        <div>
            {numMoments ?
                <div className="games">
                    <div className="games_list">
                        <div className="game_element">
                            <img src={leagueImage} alt="league_wallpaper" />
                            <p>League of Legends</p>
                            <p>{numMoments[0].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/League of Legends"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <img src={rocketleagueImage} alt="rocketleague_wallpaper" />
                            <p>Rocket League</p>
                            <p>{numMoments[1].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/Rocket League"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <img src={valorantImage} alt="valorant_wallpaper" />
                            <p>Valorant</p>
                            <p>{numMoments[2].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/Valorant"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <img src={minecraftImage} alt="minecraft_wallpaper" />
                            <p>Minecraft</p>
                            <p>{numMoments[3].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/Minecraft"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <img src={fortniteImage} alt="fortnite_wallpaper" />
                            <p>Fortnite</p>
                            <p>{numMoments[4].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/Fortnite"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <img src={csgoImage} alt="csgo_wallpaper" />
                            <p>CSGO</p>
                            <p>{numMoments[5].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/CSGO"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <img src={apexImage} alt="apex_wallpaper" />
                            <p>Apex Legends</p>
                            <p>{numMoments[6].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/Apex Legends"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">

                        </div>
                    </div>
                    <div className="popular_games">
                        <h5>Most Popular Games</h5>

                        <div className="popular_games_list">
                            <div className="popular_games_list_element">
                                <img src={numMoments[0].image} />
                                <h4>{numMoments[0].game}</h4>
                            </div>
                            <div className="popular_games_list_element">
                                <img src={numMoments[1].image} />
                                <h4>{numMoments[1].game}</h4>
                            </div>
                            <div className="popular_games_list_element">
                                <img src={numMoments[2].image} />
                                <h4>{numMoments[2].game}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                : <div></div>}
        </div>


    );
}

export default Games;
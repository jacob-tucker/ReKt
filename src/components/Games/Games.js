import React, { useState, useEffect } from 'react';
import './Games.css'
import '../Main/Main.css'
import { Link } from 'react-router-dom'
import leagueImage from '../../Resources/league_wallpaper.jpg';
import rocketleagueImage from '../../Resources/rocketleague_wallpaper.jpg'
import valorantImage from '../../Resources/valorant_wallpaper.jpg'
import minecraftImage from '../../Resources/minecraft_wallpaper.png'
import fortniteImage from '../../Resources/fortnite_wallpaper.jpg'
import csgoImage from '../../Resources/csgo_wallpaper.png'
import apexImage from '../../Resources/apex_wallpaper.jpg'
import overwatchImage from '../../Resources/overwatch_wallpaper.jpg'

const Games = (props) => {
    const [numMoments, setNumMoments] = useState(null)
    const [numMomentsSorted, setNumMomentsSorted] = useState(null)

    useEffect(() => {
        if (props.contract) retrieveNumbers();
    }, [props])

    async function retrieveNumbers() {
        let arrayOfNumMoments = [];
        let arrayOfNumMomentsSorted = [];
        arrayOfNumMoments.push({ game: "League of Legends", image: leagueImage, number: await getNumbers("League of Legends") });
        arrayOfNumMoments.push({ game: "Rocket League", image: rocketleagueImage, number: await getNumbers("Rocket League") });
        arrayOfNumMoments.push({ game: "Valorant", image: valorantImage, number: await getNumbers("Valorant") });
        arrayOfNumMoments.push({ game: "Minecraft", image: minecraftImage, number: await getNumbers("Minecraft") });
        arrayOfNumMoments.push({ game: "Fortnite", image: fortniteImage, number: await getNumbers("Fortnite") });
        arrayOfNumMoments.push({ game: "CSGO", image: csgoImage, number: await getNumbers("CSGO") });
        arrayOfNumMoments.push({ game: "Apex Legends", image: apexImage, number: await getNumbers("Apex Legends") });
        arrayOfNumMoments.push({ game: "Overwatch", image: overwatchImage, number: await getNumbers("Overwatch") });
        arrayOfNumMomentsSorted = arrayOfNumMoments.slice();
        arrayOfNumMomentsSorted.sort(function (a, b) { return b.number - a.number })
        setNumMoments(arrayOfNumMoments);
        setNumMomentsSorted(arrayOfNumMomentsSorted)
    }

    async function getNumbers(game) {
        let count = await props.contract.methods.returnVideosInGame(game).call();
        return count.length;
    }

    return (
        <div>
            {numMoments && numMomentsSorted ?
                <div className="games">
                    <div className="games_list">
                        <div className="game_element">
                            <div><img src={leagueImage} alt="league_wallpaper" /></div>
                            <p>League of Legends</p>
                            <p>{numMoments[0].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/League of Legends"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <div><img src={rocketleagueImage} alt="rocketleague_wallpaper" /></div>
                            <p>Rocket League</p>
                            <p>{numMoments[1].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/Rocket League"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <div><img src={valorantImage} alt="valorant_wallpaper" /></div>
                            <p>Valorant</p>
                            <p>{numMoments[2].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/Valorant"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <div><img src={minecraftImage} alt="minecraft_wallpaper" /></div>
                            <p>Minecraft</p>
                            <p>{numMoments[3].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/Minecraft"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <div><img src={fortniteImage} alt="fortnite_wallpaper" /></div>
                            <p>Fortnite</p>
                            <p>{numMoments[4].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/Fortnite"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <div><img src={csgoImage} alt="csgo_wallpaper" /></div>
                            <p>CSGO</p>
                            <p>{numMoments[5].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/CSGO"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <div><img src={apexImage} alt="apex_wallpaper" /></div>
                            <p>Apex Legends</p>
                            <p>{numMoments[6].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/Apex Legends"
                                }}
                            >Explore</Link>
                        </div>
                        <div className="game_element">
                            <div><img src={overwatchImage} alt="overwatch_wallpaper" /></div>
                            <p>Overwatch</p>
                            <p>{numMoments[7].number} Moments</p>
                            <Link
                                to={{
                                    pathname: "/games/Overwatch"
                                }}
                            >Explore</Link>
                        </div>
                    </div>
                    <div className="popular_games">
                        <h5>Most Popular Games</h5>

                        <div className="popular_games_list">
                            <div className="popular_games_list_element">
                                <img src={numMomentsSorted[0].image} alt="number of moments for most popular game" />
                                <h4>{numMomentsSorted[0].game}</h4>
                            </div>
                            <div className="popular_games_list_element">
                                <img src={numMomentsSorted[1].image} alt="number of moments for second most popular game" />
                                <h4>{numMomentsSorted[1].game}</h4>
                            </div>
                            <div className="popular_games_list_element">
                                <img src={numMomentsSorted[2].image} alt="number of moments for third most popular game" />
                                <h4>{numMomentsSorted[2].game}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                : <div></div>}
        </div>


    );
}

export default Games;
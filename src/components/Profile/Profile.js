import React, { useState, useEffect } from 'react';
import Identicon from 'identicon.js';
import './Profile.css'
import Moment from '../Main/Moment/Moment'

import { connect } from 'react-redux'

// Note: we get the address from the link. There are three steps to this.
// 1. Make the path in App.js path="/profile/:address"
// 2. Use NavLink wherever we click to go to the profile and pass in the address (look in Navbar NavLink)
// 3. Access it with props.match.params.address

const Profile = (props) => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        if (props.contract) retrieveVideos();
    }, [props])

    async function retrieveVideos() {
        setVideos(await getVideos(props.match.params.address));
    }

    async function getVideos(address) {
        let theVideos = await props.contract.methods.returnVideosForAddress().call({ from: address });
        console.log(theVideos);
        return theVideos;
    }

    return (
        <div className="main">
            <div className="main_video_list">
                {videos.slice(0).reverse().map((video, key) => {
                    if (props.searchVal === '' || video.title.toUpperCase().includes(props.searchVal.toUpperCase())) {
                        return (
                            <Moment key={key} video={video} />
                        )
                    }
                })}
            </div>

            <div className="profile_info">
                <img src={`data:image/png;base64,${new Identicon(props.match.params.address, 100).toString()}`} alt="Profile icon" />
                <h4>{props.match.params.address}</h4>
                <div>
                    <p>Clips: {videos.length}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { searchVal: state.searching.searchVal };
};

export default connect(mapStateToProps)(Profile);
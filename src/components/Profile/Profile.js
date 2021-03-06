import React, { useState, useEffect } from 'react';
import Identicon from 'identicon.js';
import './Profile.css'
import Moment from '../Main/Moment/Moment'

import { connect } from 'react-redux'

const Profile = (props) => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        if (props.contract) retrieveVideos();
    }, [props])

    async function retrieveVideos() {
        setVideos(await getVideos(props.location.state.address));
    }

    async function getVideos(address) {
        let theVideos = await props.contract.methods.returnVideosForAddress().call({ from: address });
        console.log(theVideos);
        return theVideos;
    }

    return (
        <div className="main">
            <div className="main_video_list">
                {videos.map((video, key) => {
                    if (video.title.includes(props.searchVal) || props.searchVal === '') {
                        return (
                            <Moment key={key} video={video} />
                        )
                    }
                })}
            </div>

            <div className="profile_info">
                <img src={`data:image/png;base64,${new Identicon(props.location.state.address, 100).toString()}`} alt="Profile icon" />
                <h4>{props.location.state.address}</h4>
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
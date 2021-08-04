import React, { useState } from 'react';
import live_peer_data from '../live_peer_integration/live_peer_data';
import '../css/window.scss';
import ShakaPlayer from 'shaka-player-react';
// import "../../node_modules/video-react/dist/video-react.css";
import 'shaka-player/dist/controls.css';
import LivePeerAPI from '../live_peer_integration/live_peer_api';
import { Player } from 'video-react';
import VideoPlayer from './video_player.js';

const WindowContent = () => {
    const example_video_url = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

    return (
        <div>
            <h4 className="text">
                Connect via OBS Studio:
                <br />
                Set OBS settings: settings {'>'} stream. set service to custom
                <br />
                set server to: {live_peer_data.livePeerServerUrl}
                <br />
                <LivePeerAPI className="live-peer-data"/>
            </h4>
            {/* <ShakaPlayer autoPlay src="" /> */}
            <VideoPlayer />
        </div>
    );
}

export default WindowContent;

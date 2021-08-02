import React, { useState } from 'react';
import live_peer_data from '../live_peer_integration/live_peer_data';
import '../css/window.scss';
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';
import LivePeerAPI from '../live_peer_integration/live_peer_api';

const WindowContent = () => {

    return (
        <div>
            <h4 className="text">
                <LivePeerAPI />
                Connect via OBS Studio:
                <br />
                Set OBS settings: settings {'>'} stream. set service to custom
                <br />
                set server to: {live_peer_data.livePeerServerUrl}
                <br />
                set stream key to: {live_peer_data.streamKey}
            </h4>
            <ShakaPlayer autoPlay src="https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd" />
        </div>
    );
}

export default WindowContent;

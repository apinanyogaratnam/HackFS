import React, { useState } from 'react';
import live_peer_data from '../live_peer_integration/live_peer_data';
import '../css/window.scss';
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';
import LivePeerAPI from '../live_peer_integration/live_peer_api';

const WindowContent = () => {
    const [api, setApi] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (!api) {
            alert("Please enter an api key");
        }

        // call api here
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="api" value={api} placeholder="Enter API Key" onChange={(e) => setApi(e.target.value)}>
                </input>
                <h6>Get API key from HERE</h6>
            </form>
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
    )
}

export default WindowContent;

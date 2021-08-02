import React from 'react';
import live_peer_data from '../live_peer_integration/live_peer_data';
import '../css/window.scss';
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

const WindowContent = () => {
    return (
        <div>
            <form>
                {/* start here to allow user to enter their api */}
                <input placeholder="Enter API Key">
                </input>
                <h6>Get API key from HERE</h6>
            </form>
            <h4 className="text">
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

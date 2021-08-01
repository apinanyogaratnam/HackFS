import React from 'react';
import livepeer_data from '../livepeer-integration/livepeer_data';
import '../css/window.scss';
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

const WindowContent = () => {
    return (
        <div>
            <h4 className="text">
                Connect via OBS Studio:
                <br />
                Set OBS settings: settings>stream. set service to custom
                <br />
                set server to: {livepeer_data.livepeerServerUrl}
                <br />
                set stream key to: {livepeer_data.streamKey}
            </h4>
            <ShakaPlayer autoPlay src="https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd" />
        </div>
    )
}

export default WindowContent;

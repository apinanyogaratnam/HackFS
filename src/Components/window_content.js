import React, { useState } from 'react';
import live_peer_data from '../Livepeer/live_peer_data';
import '../css/window.scss';
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';
import LivePeerAPI from '../Livepeer/live_peer_api';
import { Player } from 'video-react';
import VideoPlayer from './video_player.js';
import MainRecorder from './main_recorder';
import { RecordRTCPromisesHandler } from 'recordrtc';
import { saveAs } from 'file-saver';
import startRecording from './start_recording';
import stopRecording from './stop_recording';

// imports for livepeer api
import stopStream from '../Livepeer/live_peer_functions';

const WindowContent = () => {
    // url to play in the video player
    const example_video_url = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";
    var live_peer_demo_url = "https://mdw-cdn.livepeer.com/recordings/2bf2222d-b82e-4758-bce8-2a6fa04e5550/index.m3u8";
    live_peer_demo_url = "https://mdw-cdn.livepeer.com/recordings/bbc3ca03-e570-4c55-b97d-afc2aa41fdc8/source.mp4";

    // using states to store data relatively depending on user's actions
    const [recorder, setRecorder] = useState(null);
    const [stream, setStream] = useState(null);
    const [videoBlob, setVideoUrlBlob] = useState(null);

    // function to start recording
    const startRecord = () => {
        const data = startRecording();
        setRecorder(data.recorder);
        setStream(data.stream);
        setVideoUrlBlob(data.videoUrlBlob);
    }

    // function to stop recording
    const stopRecord = () => {
        const data = stopRecording();
        setRecorder(data.recorder);
        setStream(data.stream);
        setVideoUrlBlob(data.videoUrlBlob);
    }


    const downloadRecording = () => {
        if (videoBlob) {
            saveAs(videoBlob, "recording.webm");
            return;
        }

        alert("No video streamed to download");
    }

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
            {/* <div className="top-container">

            </div>
            <div className="middle-container">
                <VideoPlayer autoPlay src={live_peer_demo_url} />
                <Player playsInline src={live_peer_demo_url} />
            </div>
            <div className="bottom-container">

            </div> */}
            <button>Start Streaming</button>
            <button>Stop Streaming</button>
            <VideoPlayer playsInLine src={live_peer_demo_url} />
            {/* <MainRecorder /> */}
            {/* <ShakaPlayer autoPlay src="" /> */}
            {/* <VideoPlayer /> */}
        </div>
    );
}

export default WindowContent;

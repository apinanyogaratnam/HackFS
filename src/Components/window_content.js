import React, { useState } from 'react';
import live_peer_data from '../live_peer_integration/live_peer_data';
import '../css/window.scss';
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';
import LivePeerAPI from '../live_peer_integration/live_peer_api';
import { Player } from 'video-react';
import VideoPlayer from './video_player.js';
import MainRecorder from './main_recorder';
import { RecordRTCPromisesHandler } from 'recordrtc';
import { saveAs } from 'file-saver';

const WindowContent = () => {
    // url to play in the video player
    const example_video_url = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";
    var live_peer_demo_url = "https://mdw-cdn.livepeer.com/recordings/2bf2222d-b82e-4758-bce8-2a6fa04e5550/index.m3u8";
    live_peer_demo_url = "https://mdw-cdn.livepeer.com/recordings/bbc3ca03-e570-4c55-b97d-afc2aa41fdc8/source.mp4";

    // using states to store data relatively depending on user's actions
    const [recorder, setRecorder] = useState(null);
    const [stream, setStream] = useState(null);
    const [videoBlob, setVideoUrlBlob] = useState(null);

    // function to start recording video and audio
    const startRecording = async () => {
        let mediaDevices = navigator.mediaDevices;
        const stream = await mediaDevices.getDisplayMedia({video: true, audio: false});
        const recorder = new RecordRTCPromisesHandler(stream, {
            type: 'video'
        });
        
        await recorder.startRecording();

        // storing the data in the states
        setRecorder(recorder);
        setStream(stream);
        setVideoUrlBlob(null);
    }

    // function to stop recording audio and video
    const stopRecording = async () => {
        if (recorder) {
            await recorder.stopRecording();
            const blob = await recorder.getBlob();
            stream.stop()

            // storing the data in the states
            setVideoUrlBlob(blob);
            setStream(null);
            setRecorder(null);
            
            return;
        }

        alert("No video streaming currently to stop");
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
            <MainRecorder />
            {/* <ShakaPlayer autoPlay src="" /> */}
            {/* <VideoPlayer /> */}
        </div>
    );
}

export default WindowContent;

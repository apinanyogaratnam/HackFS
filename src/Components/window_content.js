import React, { useState, useEffect } from 'react';
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
import downloadRecording from './download_recoding';
import axios from 'axios';

// imports for livepeer api
// import stopStream from '../Livepeer/live_peer_functions';
import content from '../Livepeer/content_livepeer';

const WindowContent = () => {
    // livepeer api package
    const Livepeer = require('livepeer-nodejs');
    const apiKey = process.env.REACT_APP_API_KEY;
    const livepeerObject = new Livepeer(apiKey);

    // url to play in the video player
    const example_video_url = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";
    var live_peer_demo_url = "https://mdw-cdn.livepeer.com/recordings/2bf2222d-b82e-4758-bce8-2a6fa04e5550/index.m3u8";
    live_peer_demo_url = "https://mdw-cdn.livepeer.com/recordings/bbc3ca03-e570-4c55-b97d-afc2aa41fdc8/source.mp4";
    
    // using state to store data relatively (livepeer response data)
    const [data, setData] = useState([]);
    const [streamUrl, setStreamUrl] = useState(null);

    // create a stream using livepeer's api
    const startStream = () => {
        livepeerObject.Stream.create(content)
        .then(res => {
            console.log(res);
            setData(res);
        })
    }

    useEffect(() => {
        startStream();
    }, []);


    const stopStream = async () => {
        const url = `https://livepeer.com/api/stream/${data.id}/terminate`;
    
        await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            },
        });
    }

    const someData = async () => {
        const url = `https://livepeer.com/api/session?limit=20&parentId=${data.id}`;

        const listOfAllStreams = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });
        console.log(listOfAllStreams);
        console.log(listOfAllStreams.data[0].mp4Url);
        setStreamUrl(listOfAllStreams.data[0].mp4Url);
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
                {/* <LivePeerAPI className="live-peer-data"/> */}
                <p>Stream Key: {data.streamKey}</p>
                <p>Playback URL: https://cdn.livepeer.com/hls/{data.playbackId}/index.m3u8</p>
                <p>Stream id: {data.id}</p>
                <p>Link URL: https://mdw-cdn.livepeer.com/recordings/{data.id}/source.mp4</p>
            </h4>
            <button onClick={someData}>Stop Streaming</button>
            {/* <VideoPlayer playsInLine src="https://mdw-cdn.livepeer.com/recordings/9ffba687-6059-4aa3-8d12-0235a79701aa/source.mp4" /> */}
            <ShakaPlayer src="https://mdw-cdn.livepeer.com/recordings/9ffba687-6059-4aa3-8d12-0235a79701aa/source.mp4"/>
        </div>
    );
}

export default WindowContent;

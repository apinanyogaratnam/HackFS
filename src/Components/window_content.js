import React, { useState, useEffect } from "react";
import live_peer_data from "../Livepeer/live_peer_data";
import "../css/window.scss";
import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css";
import LivePeerAPI from "../Livepeer/live_peer_api";
import { Player } from "video-react";
import VideoPlayer from "./video_player.js";
import MainRecorder from "./main_recorder";
import { RecordRTCPromisesHandler } from "recordrtc";
import { saveAs } from "file-saver";
import startRecording from "./start_recording";
import stopRecording from "./stop_recording";
import downloadRecording from "./download_recoding";
import axios from "axios";
import styled from "styled-components";

// imports for livepeer api
// import stopStream from '../Livepeer/live_peer_functions';
import content from "../Livepeer/content_livepeer";

const WindowContent = () => {
    // livepeer api package
    const Livepeer = require("livepeer-nodejs");
    const apiKey = process.env.REACT_APP_API_KEY;
    const livepeerObject = new Livepeer(apiKey);

    // url to play in the video player
    const example_video_url =
        "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";
    var live_peer_demo_url =
        "https://mdw-cdn.livepeer.com/recordings/2bf2222d-b82e-4758-bce8-2a6fa04e5550/index.m3u8";
    live_peer_demo_url =
        "https://mdw-cdn.livepeer.com/recordings/bbc3ca03-e570-4c55-b97d-afc2aa41fdc8/source.mp4";

    // using state to store data relatively (livepeer response data)
    const [data, setData] = useState([]);
    const [streamUrl, setStreamUrl] = useState(null);

    // create a stream using livepeer's api
    const startStream = () => {
        livepeerObject.Stream.create(content).then((res) => {
            console.log(res);
            setData(res);
        });
    };

    useEffect(() => {
        startStream();
    }, []);

    const stopStream = async () => {
        const url = `https://livepeer.com/api/stream/${data.id}/terminate`;

        await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
    };

    const someData = async () => {
        const url = `https://livepeer.com/api/session?limit=20&parentId=${data.id}`;

        const listOfAllStreams = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        console.log(listOfAllStreams);
        console.log(listOfAllStreams.data[0].mp4Url);
        setStreamUrl(listOfAllStreams.data[0].mp4Url);
    };

    // console.log(window.location.href);

    return (
        <Window_Content_WrapperCSS>
            <h4 className="text">
                <TopWrapperCSS>
                    <p>URL: </p> <TopBoxCSS>{streamUrl}</TopBoxCSS>
                </TopWrapperCSS>
                <TopWrapperCSS>
                    <p>KEY: </p>{" "}
                    <TopBoxCSS>
                        <TopTextCSS>{data.streamKey}</TopTextCSS>
                    </TopBoxCSS>
                </TopWrapperCSS>
                Connect via OBS Studio:
                <br />
                Set OBS settings: settings {">"} stream. set service to custom
                <br />
                set server to: {live_peer_data.livePeerServerUrl}
                <br />
                {/* <LivePeerAPI className="live-peer-data"/> */}
                <p>
                    Playback URL: https://cdn.livepeer.com/hls/{data.playbackId}
                    /index.m3u8
                </p>
                <p>Stream id: {data.id}</p>
            </h4>
            <button onClick={someData}>Stop Streaming</button>
            {/* <VideoPlayer playsInLine src="https://mdw-cdn.livepeer.com/recordings/9ffba687-6059-4aa3-8d12-0235a79701aa/source.mp4" /> */}
            <ShakaPlayer src={streamUrl} />
        </Window_Content_WrapperCSS>
    );
};

const Window_Content_WrapperCSS = styled.div`
    background-color: purple;
    width: 100%;
    height: 100%;
`;
const TopWrapperCSS = styled.div`
    display: flex;
    flex-direction: row;
`;
const TopBoxCSS = styled.div`
    width: 70%;
    height: 2rem;
    border-style: solid;
    border-radius: 8px;
    align-self: center;
    margin-left: 0.3rem;
    display: flex;
    align-items: center;
`;

const TopTextCSS = styled.p`
    margin: 0;
    padding-left: 0.3rem;
`;

export default WindowContent;

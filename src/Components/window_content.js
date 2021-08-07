import React, { useState, useEffect } from 'react';
import live_peer_data from '../Livepeer/live_peer_data';
import '../css/window.scss';
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';
import axios from 'axios';
import styled from "styled-components";
import content from "../Livepeer/content_livepeer";

const WindowContent = () => {
    // livepeer api package
    const Livepeer = require('livepeer-nodejs');
    const apiKey = process.env.REACT_APP_API_KEY;
    const livepeerObject = new Livepeer(apiKey);

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
        <WindowContentWrapperCSS>
            <h4 className="text">
                Connect via OBS Studio:
                <br />
                Set OBS settings: settings {">"} stream. set service to custom
                <br />
                set server to: {live_peer_data.livePeerServerUrl}
                <br />
                <p>Stream Key: {data.streamKey}</p>
                <p>
                    Playback URL: https://cdn.livepeer.com/hls/{data.playbackId}/index.m3u8
                </p>
                <p>Stream id: {data.id}</p>
                <p>Link URL: {streamUrl}</p>
            </h4>
            <button onClick={someData}>Stop Streaming</button>
            <ShakaPlayer src={streamUrl} />
        </WindowContentWrapperCSS>
    );
};

const WindowContentWrapperCSS = styled.div`
  background-color: purple;
  width: 100%;
  height: 100%;
`;

export default WindowContent;

import React, { useState, useEffect } from "react";
import live_peer_data from "../Livepeer/live_peer_data";
import "../css/window.scss";
import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css";
import axios from "axios";
import styled from "styled-components";
import CopyIcon from "../assets/copy-vector.png";
import content from "../Livepeer/content_livepeer";

const WindowContent = () => {
    // livepeer api package
    const Livepeer = require("livepeer-nodejs");
    const apiKey = process.env.REACT_APP_API_KEY;
    const livepeerObject = new Livepeer(apiKey);
    // using state to store data relatively (livepeer response data)
    const [data, setData] = useState([]);
    const [streamUrl, setStreamUrl] = useState(null);

    // create a stream using livepeer's api
    const startStream = () => {
        livepeerObject.Stream.create(content).then((res) => {
            setData(res);
        });
    };

    useEffect(() => {
        startStream();
    }, []);

    const getStreamUrl = async () => {
        const url = `https://livepeer.com/api/session?limit=20&parentId=${data.id}`;

        const listOfAllStreams = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (listOfAllStreams.data.length === 0) {
            alert("No stream detected");
            return;
        }

        setStreamUrl(listOfAllStreams.data[0].mp4Url);

        if (streamUrl === "") alert("stream is currently processing");
    };

    const getParcelData = () => {
        var urlOfActiveWebsite = window.location.href;
        const exampleUrl =
            "https://play.decentraland.org/?position=62%2C22&realm=dg-honey";

        if (
            urlOfActiveWebsite.substring(
                0,
                "https://play.decentraland.org/?position=".length
            ) !== "https://play.decentraland.org/?position="
        ) {
            alert("invalid website");

            return;
        }

        const removedBaseUrl = () => {
            return urlOfActiveWebsite.substring(
                "https://play.decentraland.org/".length
            );
        };

        // ?position=62%2C22&realm=dg-honey
        const subUrl = removedBaseUrl();

        const getXCoord = () => {
            const positionIndex = subUrl.indexOf("position");
            const indexOfXCoordStart = positionIndex + "position=".length;

            const indexOfXCoordEnd = subUrl.indexOf("%");
            const xCoordString = subUrl.substring(
                indexOfXCoordStart,
                indexOfXCoordEnd
            );

            return parseInt(xCoordString);
        };

        const getYCoord = () => {
            const indexOfXCoordEnd = subUrl.indexOf("%");
            const indexOfYCoordEnd = subUrl.indexOf("&");

            const yCoordString = subUrl.substring(
                indexOfXCoordEnd + 1,
                indexOfYCoordEnd
            );

            function yCoordStringSanitized() {
                const yCoordStringFirstLayer = yCoordString.substring(2);

                if (yCoordStringFirstLayer[0] === "-")
                    return yCoordStringFirstLayer.substring(1);

                return yCoordStringFirstLayer;
            }

            return parseInt(yCoordStringSanitized());
        };

        // 62
        const xCoord = getXCoord();
        // 22
        const yCoord = getYCoord();

        const landObj = {
            xCoord: xCoord,
            yCoord: yCoord,
            urlOfLand: urlOfActiveWebsite,
        };

        // return landObj;
    };

    const copyUrl = async () => {
        await navigator.clipboard.writeText(live_peer_data.livePeerServerUrl);
    };

    const copyKey = async () => {
        await navigator.clipboard.writeText(data.streamKey);
    };

    return (
        <Window_Content_WrapperCSS>
            <h4 className="text">
                <TopWrapperCSS>
                    <p>URL: </p>{" "}
                    <TopBoxCSS>
                        <TopTextCSS>
                            {live_peer_data.livePeerServerUrl}
                        </TopTextCSS>
                    </TopBoxCSS>{" "}
                    <CopyIconCSS src={CopyIcon} onClick={copyUrl} />
                </TopWrapperCSS>
                <TopWrapperCSS>
                    <p>KEY: </p>
                    <TopBoxCSS>
                        <TopTextCSS>{data.streamKey}</TopTextCSS>
                    </TopBoxCSS>
                    <CopyIconCSS src={CopyIcon} onClick={copyKey} />
                </TopWrapperCSS>
                {/* Connect via OBS Studio:
                <br />
                Set OBS settings: settings {">"} stream. set service to custom
                <br />
                set server to: {live_peer_data.livePeerServerUrl}
                <br />
                <LivePeerAPI className="live-peer-data" />
                <p>
                    Playback URL: https://cdn.livepeer.com/hls/{data.playbackId}
                    /index.m3u8
                </p>
                <p>Stream id: {data.id}</p> */}
            </h4>
            <ButtonCSS onClick={getStreamUrl}>Play Stream</ButtonCSS>
            <ButtonCSS onClick={getParcelData}>
                Get Coordinates of Parcel
            </ButtonCSS>
            {/* <VideoPlayer playsInLine src="https://mdw-cdn.livepeer.com/recordings/9ffba687-6059-4aa3-8d12-0235a79701aa/source.mp4" /> */}
            <ShakaPlayer src={streamUrl} />
        </Window_Content_WrapperCSS>
    );
};

const Window_Content_WrapperCSS = styled.div`
    background-color: 2b2b31;
    width: 100%;
    height: 100%;
`;

const TopWrapperCSS = styled.div`
    display: flex;
    flex-direction: row;
`;

const TopBoxCSS = styled.div`
    width: 67%;
    height: 2rem;
    border-style: solid;
    border-width: 0.2rem;
    border-radius: 8px;
    align-self: center;
    margin-left: 0.3rem;
    display: flex;
    align-items: center;
    color: rgba(247, 250, 252, 1);
    overflow-x: hidden;
    overflow-y: hidden;
`;

const TopTextCSS = styled.p`
    margin: 0;
    padding-left: 0.3rem;
    color: rgba(247, 250, 252, 1);
`;

const CopyIconCSS = styled.img`
    object-fit: contain;
    margin: 0.7rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.3);
    }
`;

const ButtonCSS = styled.button`
    height: 2rem;
    color: rgba(247, 250, 252, 1);
    background-color: rgba(97, 94, 220, 1);
    border-radius: 8px;
    margin-right: 1rem;
    font-size: 16px;
    letter-spacing: 0.05rem;
    font-weight: bold;
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.03);
    }
`;

export default WindowContent;

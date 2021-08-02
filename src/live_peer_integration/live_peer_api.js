import axios from 'axios';
import React, { useState, useEffect } from 'react'

const LivePeerAPI = () => {
    const Livepeer = require('livepeer-nodejs');
    const api_key = process.env.REACT_APP_API_KEY;
    const livepeerObject = new Livepeer(api_key);

    const stream = async () => {
        await livepeerObject.Stream.create({
            "name": "test_stream", 
            "profiles": [
                {
                    "name": "720p",
                    "bitrate": 2000000,
                    "fps": 30,
                    "width": 1280,
                    "height": 720
                },
                {
                    "name": "480p",
                    "bitrate": 1000000,
                    "fps": 30,
                    "width": 854,
                    "height": 480
                },
                {
                    "name": "36p",
                    "bitrate": 500000,
                    "fps": 30,
                    "width": 640,
                    "height": 360
                },
            ]
        });
    }

    console.log(stream.name);

    return (
        <div>
            
        </div>
    )
}

export default LivePeerAPI;

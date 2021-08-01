import React from 'react'

const LivePeerAPI = () => {
    const base_url = "https://livepeer.com/api/";
    const post_url = "https://livepeer.com/api/stream";

    const exampleResponse = {
        "name":"test_stream",
        "profiles":[
            {"name":"720p","bitrate":2000000,"fps":30,"width":1280,"height":720},
            {"name":"480p","bitrate":1000000,"fps":30,"width":854,"height":480},
            {"name":"360p","bitrate":500000,"fps":30,"width":640,"height":360}
        ],
        "id":"ijkl61f3-95bd-4971-a7b1-4dcb5d39e78a",
        "createdAt":1596081229373,
        "streamKey":"abcd-uimq-jtgy-x98v",
        "playbackId":"efghb2mxupongp5k"
    }

    return (
        <div>
            
        </div>
    )
}

export default LivePeerAPI;

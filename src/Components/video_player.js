import React from 'react';
import { Player } from 'video-react';
import "video-react/dist/video-react.css"; // import css

const VideoPlayer = () => {
    return (
        <div>
            {/* React component for video player */}
            <Player
                playsInline
                poster="/assets/poster.png"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
        </div>
    );
}

export default VideoPlayer;

import React, { useState } from 'react';
import RecordRTC, { invokeSaveAsDialog, RecordRTCPromisesHandler } from 'recordrtc';
import { saveAs } from 'file-saver';
import { Player } from 'video-react';
import "video-react/dist/video-react.css"; // import css

const MainRecorder = () => {
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
            <button onClick={startRecording}>Start streaming</button>
            <button onClick={stopRecording}>Stop streaming</button>
            <button onClick={downloadRecording}>Download Stream</button>
            {!!videoBlob && (<Player src={window.URL.createObjectURL(videoBlob)} />)}
        </div>
    );
}

export default MainRecorder;

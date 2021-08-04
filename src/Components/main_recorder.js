import React, { useState } from 'react';
import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc';

const MainRecorder = () => {
    // using states to store data relatively depending on user's actions
    const [recorder, setRecorder] = useState(null);
    const [stream, setStream] = useState(null);
    const [videoBlob, setVideoUrlBlob] = useState(null);

    // function to start recording video and audio
    const startRecording = async () => {
        let mediaDevices = navigator.mediaDevices;
        const stream = await mediaDevices.getUserMedia({video: true, audio: true});
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
        }
    }

    return (
        <div>
            <button onClick={startRecording()}>Start streaming</button>
            <button onClick={stopStreaming()}></button>
        </div>
    )
}

export default MainRecorder;

import { RecordRTCPromisesHandler } from 'recordrtc';

const startRecording = async () => {
    let mediaDevices = navigator.mediaDevices;
    const stream = await mediaDevices.getDisplayMedia({video: true, audio: false});
    const recorder = new RecordRTCPromisesHandler(stream, {
        type: 'video'
    });
    
    await recorder.startRecording();

    // returning the data to the corresponding states
    return {"recorder": recorder, "stream": stream, "videoUrlBlob": null};
}

export default startRecording;

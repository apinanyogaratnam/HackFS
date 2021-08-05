import { RecordRTCPromisesHandler } from 'recordrtc';

const stopRecording = async () => {
    if (recorder) {
        await recorder.stopRecording();
        const blob = await recorder.getBlob();
        stream.stop()

        // storing the data in the states
        setVideoUrlBlob(blob);
        setStream(null);
        setRecorder(null);
        
        return {"recorder": null, "stream": null, "videoUrlBlob": blob};
    }

    alert("No video streaming currently to stop");
}

export default stopRecording;

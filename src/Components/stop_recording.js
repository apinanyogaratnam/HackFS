const stopRecording = async ({ stream, recorder }) => {
    if (recorder) {
        await recorder.stopRecording();
        const blob = await recorder.getBlob();
        stream.stop()

        // storing the data in the states
        
        return {"recorder": null, "stream": null, "videoUrlBlob": blob};
    }

    alert("No video streaming currently to stop");
}

export default stopRecording;

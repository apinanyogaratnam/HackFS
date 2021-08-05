import { saveAs } from 'file-saver';

const downloadRecording = ({ videoBlob }) => {
    if (videoBlob) {
        saveAs(videoBlob, "recording.webm");
        return;
    }

    alert("No video streamed to download");
}

export default downloadRecording;

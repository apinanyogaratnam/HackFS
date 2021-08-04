import React from 'react'

const MainRecorder = () => {
    const [recorder, setRecorder] = useState(null);
    const [stream, setStream] = useState(null);
    const [videoBlob, setVideoUrlBlob] = useState(null);
    
    const startRecording = async () => {
        let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        let recorder = new RecordRTCPromisesHandler(stream, {
            type: 'video'
        });
        recorder.startRecording();
    }

    return (
        <div>
            <button>Start streaming</button>

        </div>
    )
}

export default MainRecorder;

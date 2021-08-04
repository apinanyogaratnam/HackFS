import React from 'react'

const MainRecorder = () => {
    const [recorder, setRecorder] = useState(null);
    const [stream, setStream] = useState(null);
    const [videoBlob, setVideoUrlBlob] = useState(null);

    const startRecording = async () => {
        let mediaDevices = navigator.mediaDevices;
        const stream = await mediaDevices.getUserMedia({video: true, audio: true});
        const recorder = new RecordRTCPromisesHandler(stream, {
            type: 'video'
        });
        
        await recorder.startRecording();
        setRecorder(recorder);
        setStream(stream);
        setVideoUrlBlob(null);
    }

    return (
        <div>
            <button>Start streaming</button>

        </div>
    )
}

export default MainRecorder;

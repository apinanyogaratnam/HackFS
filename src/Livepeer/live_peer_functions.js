import axios from 'axios';

const stopStream = ({ streamId, apiKey }) => {
    const url = `https://livepeer.com/api/stream/${streamId}/terminate`;

    axios.delete(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        },
    });
}

export default stopStream;

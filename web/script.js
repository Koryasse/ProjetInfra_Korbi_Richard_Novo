const socket = io();

const remoteVideo = document.getElementById('remoteVideo');
const mediaSource = new MediaSource();
remoteVideo.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', () => {
    const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');

    socket.on('video-stream', (data) => {
        const blob = new Blob([data], { type: 'video/webm' });
        const reader = new FileReader();
        reader.onload = () => {
            sourceBuffer.appendBuffer(new Uint8Array(reader.result));
        };
        reader.readAsArrayBuffer(blob);
    });
});
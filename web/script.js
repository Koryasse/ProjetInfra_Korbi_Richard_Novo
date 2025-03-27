const socket = io();

navigator.mediaDevices.getUserMedia({ video: true, audio: false }) 
    .then((stream) => {
        const localVideo = document.getElementById('localVideo');
        localVideo.srcObject = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
            socket.emit('video-stream', e.data);
        };
        mediaRecorder.start(100);
    })

    .catch((error) => {
        console.error('Erreur lors de la récupération du média');
    });
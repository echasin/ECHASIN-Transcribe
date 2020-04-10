console.log('In: main.js')

//Initialize variable mediaContrainsts
var mediaConstraints = {
    audio: true
};
console.log('mediaConstraints', mediaConstraints)


//mediaContstaints {audio.true},  onMediaSucess(function),  onMediaError(function)
navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

function onMediaSuccess(stream) {
    var mediaRecorder = new MediaStreamRecorder(stream);// Requires js library cdn.webrtc-experiment.com/MediaStreamRecorder.js
    mediaRecorder.mimeType = 'audio/webm'; // audio/webm or audio/ogg or audio/wav

    console.log('function OnMediaSuccessmediaRecorder.mimeType = ', mediaRecorder.mimeType  )
}

function onMediaError(stream) {
}
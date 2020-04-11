console.log('In: main.js')

//Initialize variable mediaContrainsts
var mediaConstraints = {
    audio: true
};
console.log('mediaConstraints', mediaConstraints)

function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
  }

//onMediaSuccess
var mediaRecorder;

      function onMediaSuccess(stream) {
        var audio = document.createElement('audio');

        audio = mergeProps(audio, {
          controls: true,
          muted: true
        });
        audio.srcObject = stream;
        audio.play();

        audiosContainer.appendChild(audio);
        audiosContainer.appendChild(document.createElement('hr'));

        mediaRecorder = new MediaStreamRecorder(stream);
        mediaRecorder.stream = stream;

        var recorderType = document.getElementById('audio-recorderType').value;

        if (recorderType === 'MediaRecorder API') {
          mediaRecorder.recorderType = MediaRecorderWrapper;
        }

        if (recorderType === 'WebAudio API (WAV)') {
          mediaRecorder.recorderType = StereoAudioRecorder;
          mediaRecorder.mimeType = 'audio/wav';
        }

        if (recorderType === 'WebAudio API (PCM)') {
          mediaRecorder.recorderType = StereoAudioRecorder;
          mediaRecorder.mimeType = 'audio/pcm';
        }

        // don't force any mimeType; use above "recorderType" instead.
        // mediaRecorder.mimeType = 'audio/webm'; // audio/ogg or audio/wav or audio/webm

        mediaRecorder.audioChannels = !!document.getElementById('left-channel').checked ? 1 : 2;
        mediaRecorder.ondataavailable = function (blob) {
          
          console.log('Create audiosContainer');//Create audiosContainer
          
          var a = document.createElement('a');
          a.target = '_blank';
          a.innerHTML = 'Open Recorded Audio No. ' + (index++) + ' (Size: ' + bytesToSize(blob.size) + ') Time Length: ' + getTimeLength(timeInterval);

          a.href = URL.createObjectURL(blob);

          audiosContainer.appendChild(a);
          audiosContainer.appendChild(document.createElement('hr'));
        };

        var timeInterval = document.querySelector('#time-interval').value;
        if (timeInterval) timeInterval = parseInt(timeInterval);
        else timeInterval = 5 * 1000;

        // get blob after specific time interval
        mediaRecorder.start(timeInterval);

        document.querySelector('#stop-recording').disabled = false;
        document.querySelector('#pause-recording').disabled = false;
        document.querySelector('#save-recording').disabled = false;
      }

       //function onMediaError
      function onMediaError(e) {
        console.error('media error', e);
      }
      




      window.onbeforeunload = function () {
        document.querySelector('#start-recording').disabled = false;
      };


      
// const videoElement = document.querySelector('video');
var audioInputSelect2 = document.querySelector('select#audioSource2');
var selectors2 = [audioInputSelect2];
var mediaConstraints = {
  audio: true
};
//NEW CODE
function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
  navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}

//onMediaSuccess
var mediaRecorder2;

function onMediaSuccess2(stream) {
  var audio2 = document.createElement('audio');
  

  audio2 = mergeProps(audio2, {
    controls: true,
    muted: true
  });
  audio2.srcObject = stream;
  audio2.play();

  audiosContainer2.appendChild(audio2);
  audiosContainer2.appendChild(document.createElement('hr'));

  mediaRecorder2 = new MediaStreamRecorder(stream);
  mediaRecorder2.stream = stream;

  var recorderType = document.getElementById('audio-recorderType2').value;

  if (recorderType === 'MediaRecorder API') {
    mediaRecorder2.recorderType = MediaRecorderWrapper;
  }

  if (recorderType === 'WebAudio API (WAV)') {
    mediaRecorder2.recorderType = StereoAudioRecorder;
    mediaRecorder2.mimeType = 'audio/wav';
  }

  if (recorderType === 'WebAudio API (PCM)') {
    mediaRecorder2.recorderType = StereoAudioRecorder;
    mediaRecorder2.mimeType = 'audio/pcm';
  }

  // don't force any mimeType; use above "recorderType" instead.
  // mediaRecorder.mimeType = 'audio/webm'; // audio/ogg or audio/wav or audio/webm

  mediaRecorder2.audioChannels = !!document.getElementById('left-channel2').checked ? 1 : 2;
  mediaRecorder2.ondataavailable = function (blob2) {

    console.log('Create audiosContainer');//Create audiosContainer

    var a2 = document.createElement('a');
    a2.target = '_blank';
    a2.innerHTML = 'Mic #2 Open Recorded Audio No. ' + (index++) + ' (Size: ' + bytesToSize(blob2.size) + ') Time Length: ' + getTimeLength(timeInterval2);

    a2.href = URL.createObjectURL(blob2);

    audiosContainer2.appendChild(a2);
    audiosContainer2.appendChild(document.createElement('hr'));
  };

  var timeInterval2 = document.querySelector('#time-interval2').value;
  if (timeInterval2) timeInterval2 = parseInt(timeInterval2);
  else timeInterval2 = 5 * 1000;

  // get blob after specific time interval
  mediaRecorder2.start(timeInterval2);

  document.querySelector('#stop-recording2').disabled = false;
  document.querySelector('#pause-recording2').disabled = false;
  document.querySelector('#save-recording2').disabled = false;
}

//function onMediaError
function onMediaError(e) {
  console.error('media error', e);
}

window.onbeforeunload = function () {
  document.querySelector('#start-recording2').disabled = false;
};

// audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors2.map(select => select.value);
  selectors2.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label || `microphone ${audioInputSelect2.length + 1}`;
      audioInputSelect2.appendChild(option);
    } else {
      // console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors2.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// Attach audio output device to video element using device/sink ID.
function attachSinkId(element, sinkId) {
  if (typeof element.sinkId !== 'undefined') {
    element.setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
        })
        .catch(error => {
          let errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to first output device in the list as it's the default.
          audioOutputSelect.selectedIndex = 0;
        });
  } else {
    console.warn('Browser does not support output device selection.');
  }
}

function changeAudioDestination() {
  const audioDestination = audioOutputSelect.value;
  attachSinkId(videoElement, audioDestination);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function start() {
 
  navigator.mediaDevices.enumerateDevices()
    .then(function (devices) {
      devices.forEach(function (device) {;
        console.log(device.kind + ": " + device.label);
      });
    })
  function getConnnectedDevices() {
    console.log("function getConnnectedDevices()")
  }

  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const audioSource2 = audioInputSelect2.value;

  const constraints = {
    audio: {deviceId: audioSource2 ? {exact: audioSource2} : undefined}
  };
  console.log('Device Selected :', audioSource2 );
  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}

audioInputSelect2.onchange = start;

start();

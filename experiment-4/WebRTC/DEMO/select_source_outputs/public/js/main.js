/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

// const videoElement = document.querySelector('video');
const audioInputSelect = document.querySelector('select#audioSource');
const selectors = [audioInputSelect];
var mediaConstraints = {
  audio: true
};
//NEW CODE
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

//EXISTING CODE
// audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);

function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map(select => select.value);
  selectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
      audioInputSelect.appendChild(option);
    // } else if (deviceInfo.kind === 'audiooutput') {
    //   option.text = deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`;
    //   audioOutputSelect.appendChild(option);
    // } else if (deviceInfo.kind === 'videoinput') {
    //   option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
    //   videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach((select, selectorIndex) => {
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
  //NEW CODE 
  console.log("In function start()");

  navigator.mediaDevices.enumerateDevices()
    .then(function (devices) {
      devices.forEach(function (device) {
        // console.log(device.kind + ": " + device.label +
        //   " id = " + device.deviceId);
        console.log(device.kind + ": " + device.label);
      });
    })
  function getConnnectedDevices() {
    console.log("function getConnnectedDevices()")
  }

  //EXISTING CODE
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const audioSource = audioInputSelect.value;
//   const videoSource = videoSelect.value;
  const constraints = {
    audio: {deviceId: audioSource ? {exact: audioSource} : undefined}
    // video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}

audioInputSelect.onchange = start;
// audioOutputSelect.onchange = changeAudioDestination;

// videoSelect.onchange = start;

start();
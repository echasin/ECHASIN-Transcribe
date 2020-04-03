# Resources
# http://portaudio.com/docs/v19-doxydocs/api_overview.html
# https://python-sounddevice.readthedocs.io/en/0.3.15/usage.html#recording
# https://stackoverflow.com/questions/36894315/how-to-select-a-specific-input-device-with-pyaudio

import pyaudio
import wave
import sounddevice as sd

#List all Sound Devices
sound_devices = sd.query_devices()
print(sound_devices)

#Set Default
sd.default.samplerate = 44100
sound_device_default = sd.default.device = 'Line 1/2 (M-Audio AIR 192 14 Out 1-2), Windows WDM-KS (0 in, 2 out)'
print(sound_device_default)

#Set Audio Format
FORMAT = pyaudio.paInt16
INPUT_DEVICE = 1
CHANNELS = 1
RATE = 44100
CHUNK = 1024
RECORD_SECONDS = 5
WAVE_OUTPUT_FILENAME = "file.wav"
 
#Initialize pyaudio
audio = pyaudio.PyAudio()


#Start Recording
stream = audio.open(
    input_device_index= INPUT_DEVICE,
    format=FORMAT, channels=CHANNELS,
    rate=RATE,
    input=True,
    frames_per_buffer=CHUNK)
print ("recording...")


frames = []
 
for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
    data = stream.read(CHUNK)
    frames.append(data)
print ("finished recording")
 
 
# stop Recording
stream.stop_stream()
stream.close()
audio.terminate()
 
waveFile = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
waveFile.setnchannels(CHANNELS)
waveFile.setsampwidth(audio.get_sample_size(FORMAT))
waveFile.setframerate(RATE)
waveFile.writeframes(b''.join(frames))
waveFile.close()

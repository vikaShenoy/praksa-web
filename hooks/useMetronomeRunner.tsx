import { useEffect, useRef } from 'react';
import { WOODBLOCK_SOUND } from '../utils/constants';

interface Props {
  bpm: number;
  isPlaying: boolean;
}

const useMetronomeRunner = ({ bpm, isPlaying }: Props) => {
  const audioContext = useRef<AudioContext | null>(null);
  const bufferedSound = useRef<AudioBuffer | null>(null);
  const bufferSource = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const request = new XMLHttpRequest();
    request.responseType = 'arraybuffer';
    request.onload = () => {
      audioContext.current?.decodeAudioData(
        request.response,
        (loadedBuffer: AudioBuffer) => {
          bufferedSound.current = loadedBuffer;
        }
      );
    };
    request.open('GET', WOODBLOCK_SOUND, true);
    request.send();
  }, []);

  useEffect(() => {
    isPlaying ? play() : stop();
  }, [isPlaying]);

  useEffect(() => {
    if (!audioContext.current) {
      audioContext.current = new window.AudioContext();
    }
  }, []);

  const play = () => {
    const context = audioContext.current;
    if (!context) {
      return;
    }

    let nextStart = context.currentTime;

    const schedule = () => {
      nextStart += 60 / bpm;
      console.log(bpm);
      bufferSource.current = context.createBufferSource();
      bufferSource.current.buffer = bufferedSound.current;
      bufferSource.current.connect(context.destination);
      bufferSource.current.onended = schedule;
      bufferSource.current.start(nextStart);
    };

    schedule();
  };

  const stop = () => {
    // TODO
  };
};

export default useMetronomeRunner;

import { useEffect, useRef, useState } from "react";
import { WOODBLOCK_SOUND } from "../utils/constants";

interface Props {
  bpm: number;
  isPlaying: boolean;
}

// TODO: Implement
const useMetronomeRunner = ({ bpm, isPlaying }: Props) => {
  const audioContext = useRef<AudioContext | null>(null);
  const audioPlayer = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(WOODBLOCK_SOUND) : undefined
  );
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    isPlaying ? play() : stop();
  }, [isPlaying]);

  useEffect(() => {
    if (!audioContext.current) {
      audioContext.current = new window.AudioContext();
    }
  }, []);

  useEffect(() => {
    const request = new XMLHttpRequest();
    request.open('GET', WOODBLOCK_SOUND, true)
    request.responseType = 'arraybuffer';

    request.onload = () => {
      audioContext.current?.decodeAudioData(request.response, (loadedBuffer) => {
        setBuffer(loadedBuffer);
      })
    }
  }, []);

  const play = () => {
    if (audioContext.current && audioPlayer.current) {
      let source = audioContext.current.createBufferSource();
      source.connect(audioContext.current.destination);
      source.buffer = buffer;
      audioPlayer.current.play();
    }
  };

  const stop = () => {
    if (audioPlayer.current) {
      audioPlayer.current.pause();
    }
  };
}

export default useMetronomeRunner;
import { useEffect, useRef } from 'react'

interface Props {
  tempo: number
  isPlaying: boolean
}

const useMetronomeRunner = ({ tempo, isPlaying }: Props) => {
  const audioContext = useRef<AudioContext | null>(null)
  const audioSource = useRef<AudioBufferSourceNode | null>(null)
  const audioBuffer = useRef<AudioBuffer | null>(null)

  useEffect(() => {
    setup()
  }, [])

  useEffect(() => {
    isPlaying ? audioContext.current?.resume() : audioContext.current?.suspend()
  }, [isPlaying])

  useEffect(() => {
    const source = audioSource.current
    if (source) {
      source.loopEnd = 1 / (tempo / 60)
    }
  }, [tempo])

  const setup = () => {
    audioContext.current = new window.AudioContext()
    const context = audioContext.current

    audioBuffer.current = context.createBuffer(
      1,
      context.sampleRate * 2,
      context.sampleRate
    )
    const buffer = audioBuffer.current

    audioSource.current = context.createBufferSource()
    const source = audioSource.current

    createTone()

    source.buffer = buffer
    source.loop = true
    source.loopEnd = 1 / (tempo / 60)
    source.connect(context.destination)
    source.start(0)
  }

  const createTone = () => {
    const context = audioContext.current
    const buffer = audioBuffer.current
    if (!context || !buffer) {
      return
    }

    const channel = buffer.getChannelData(0)
    const durationFrames = context.sampleRate / 50

    let phase = 0
    let amp = 1
    let frequency = 320

    for (let i = 0; i < durationFrames; i++) {
      channel[i] = Math.sin(phase) * amp
      phase += (2 * Math.PI * frequency) / context.sampleRate
      if (phase > 2 * Math.PI) {
        phase -= 2 * Math.PI
      }
      amp -= 1 / durationFrames
    }
  }
}

export default useMetronomeRunner

import { atom } from 'jotai'
import { DEFAULT_BPM, DEFAULT_COUNTDOWN_TIME } from '../utils/constants'

export const tempoAtom = atom(DEFAULT_BPM)
export const timeAtom = atom(DEFAULT_COUNTDOWN_TIME)

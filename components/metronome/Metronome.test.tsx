import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Theme from '../Theme'
import Metronome from './Metronome'

const mockBufferSource = { buffer: null, connect: jest.fn(), start: jest.fn() }
const mockAudioContext = {
  createBuffer: jest.fn(),
  createBufferSource: jest.fn().mockImplementation(() => mockBufferSource),
  suspend: jest.fn(),
  resume: jest.fn(),
}
window.AudioContext = jest.fn().mockImplementation(() => mockAudioContext)

describe('Metronome', () => {
  beforeEach(() => {
    render(
      <Theme>
        <Metronome />
      </Theme>
    )
  })

  describe('text', () => {
    it('defaults to 120 bpm', () => {
      const tempoLabel = screen.queryByLabelText('tempo-label')
      expect(tempoLabel).toBeInTheDocument()
      expect(tempoLabel?.textContent).toBe('120')
    })
  })

  describe('buttons', () => {
    it('include a button for increasing tempo', () => {
      const plusBtn = screen.getByRole('button', { name: /plus/i })
      expect(plusBtn).toBeDefined()
    })

    it('include a button for decreasing tempo', () => {
      const minusBtn = screen.getByRole('button', { name: /minus/i })
      expect(minusBtn).toBeDefined()
    })

    it('include a play-stop button', () => {
      const playStopBtn = screen.getByRole('button', { name: 'play-button' })
      expect(playStopBtn).toBeDefined()
    })

    it('clicking the plus button increments the bpm text', () => {
      const plusBtn = screen.getByRole('button', { name: /plus/i })
      fireEvent.click(plusBtn)

      const tempoLabel = screen.queryByLabelText('tempo-label')
      expect(tempoLabel?.textContent).toBe('121')
    })

    it('clicking the minus button decrements the bpm text', () => {
      const minusBtn = screen.getByRole('button', { name: 'minus' })
      fireEvent.click(minusBtn)

      const tempoLabel = screen.queryByLabelText('tempo-label')
      expect(tempoLabel?.textContent).toBe('119')
    })

    it('clicking the play button changes the icon to a stop icon', () => {
      fireEvent.click(screen.getByRole('button', { name: 'play-button' }))
      expect(screen.queryByLabelText('stop-button')).toBeInTheDocument()
    })

    it('clicking the play button twice changes the icon to a stop icon back to a play icon', () => {
      fireEvent.click(screen.getByRole('button', { name: 'play-button' }))
      fireEvent.click(screen.getByRole('button', { name: 'stop-button' }))
      expect(screen.queryByLabelText('play-button')).toBeInTheDocument()
    })
  })

  describe('slider', () => {
    it('is present', () => {
      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    it('can be adjusted to adjust the bpm text', () => {
      const slider = screen.getByRole('slider')
      fireEvent.change(slider, { target: { value: 180 } })

      const tempoLabel = screen.queryByLabelText('tempo-label')
      expect(tempoLabel?.textContent).toBe('180')
    })
  })
})

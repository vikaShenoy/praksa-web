import { fireEvent, render, screen } from '@testing-library/react'
import Theme from '../../Theme'
import PlayStopButton from './PlayStopButton'

describe('PlayStopButton component', () => {
  let mockOnClick = jest.fn()

  const reset = (isPlaying: boolean = false) => {
    render(
      <Theme>
        <PlayStopButton isPlaying={isPlaying} onClick={mockOnClick} />
      </Theme>
    )
  }

  it('shows the stop button while playing', () => {
    reset(true)
    const button = screen.queryByRole('button') as any
    expect(button.name).toBe('stop-button')
  })

  it('shows the play button when stopped', () => {
    reset(false)
    const button = screen.queryByRole('button') as any
    expect(button.name).toBe('play-button')
  })

  it('calls the onClick callback when clicked', () => {
    reset(true)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockOnClick).toHaveBeenCalled()
  })
})

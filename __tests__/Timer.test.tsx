import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Theme from '../components/Theme';
import Timer from '../components/Timer';

describe('Timer component', () => {
  const clickPlay = () => {
    const playButton = screen.getByRole('button', { name: 'play-button'})
    fireEvent.click(playButton)
  }

  const clickReset = () => {
    const resetBtn = screen.getByRole('button', { name: 'reset-timer-button' })
    fireEvent.click(resetBtn)
  }

  const waitTwoSeconds = () => {
    act(() => {
      jest.advanceTimersByTime(2000)
    })
  }
  
  beforeEach(() => {
    render(
      <Theme>
        <Timer />
      </Theme>
    );
  });

  describe('on render', () => {
    it('defaults to 5 minutes', () => {
      expect(screen.getByLabelText('time-label').textContent).toBe("5:00")
    });
  
    it('has a play button', () => {
      expect(screen.queryByRole('button', { name: 'play-button' })).toBeTruthy()
    });

    it('does not have a stop button', () => {
      expect(screen.queryByRole('button', { name: 'stop-button' })).not.toBeTruthy()
    })
  
    it('has a reset button', () => {
      expect(screen.queryByRole('button', { name: 'reset-timer-button' })).toBeTruthy()
    });
  
    it('has a progress bar', () => {
      expect(screen.queryByRole('progressbar')).toBeTruthy()
    });

    it('has a progress bar which is completely filled', () => {
      const progressBar = screen.getByRole('progressbar')
      expect(getComputedStyle(progressBar).width).toBe('100%')
    })
  })

  describe('actions', () => {
    it('time text decreases while the timer is live', async () => {
      clickPlay()
      const label = screen.getByLabelText('time-label')
      await waitFor(() => {
        expect(label.textContent).toBe("4:57")
      }, { timeout: 5000})
    })

    it('progress bar decreases while the timer is live', async () => {
      clickPlay()
      const progressBar = screen.getByRole("progressbar")
      await waitFor(() => {
        expect(getComputedStyle(progressBar).width).toBe("99%")
      }, { timeout: 5000})
    })

    // TODO
    it('the play icon becomes a stop icon when the timer hits zero', () => {

    })
  })

  describe('reset', () => {
    it('clicking reset button stops the timer', () => {
      clickPlay()
      clickReset()
      const progressBar = screen.getByRole("progressbar")
      const progress1 = getComputedStyle(progressBar).width
      waitTwoSeconds()
      const progress2 = getComputedStyle(progressBar).width
      expect(progress1).toEqual(progress2)
    })

    it('clicking reset button resets the progress bar', () => {
      clickPlay()
      waitTwoSeconds()
      clickReset()
      const progressBar = screen.getByRole("progressbar")
      fireEvent.click(screen.getByRole('button', { name: 'reset-timer-button' }))
      expect(getComputedStyle(progressBar).width).toBe("100%")
    })

    it('clicking reset button resets the time text', () => {
      clickPlay()
      waitTwoSeconds()
      clickReset()
      const label = screen.getByLabelText('time-label')
      expect(label.textContent).toBe("5:00")
    })
  })
});

import { render, screen } from '@testing-library/react';
import Theme from '../components/Theme';
import Timer from '../components/Timer';

describe('Timer component', () => {
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
  })

  describe('actions', () => {
    it('time text decreases while the timer is live', () => {})

    it('progress bar decreases while the timer is live', () => {})

    it('the play icon becomes a stop icon when the timer hits zero', () => {})
  })

  describe('reset', () => {
    it('clicking reset button stops the timer', () => {})

    it('clicking reset button resets the progress bar', () => {})

    it('clicking reset button resets the time text', () => {})
  })
});

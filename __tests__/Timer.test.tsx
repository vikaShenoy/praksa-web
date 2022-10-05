import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Theme from '../components/Theme';
import Timer from '../components/Timer';

describe('Timer component', () => {
  const clickPlay = () => {
    const playButton = screen.getByRole('button', { name: 'play-button' });
    fireEvent.click(playButton);
  };

  const clickStop = () => {
    const stopButton = screen.getByRole('button', { name: 'stop-button' });
    fireEvent.click(stopButton);
  };

  const clickReset = () => {
    const resetBtn = screen.getByRole('button', { name: 'reset-timer-button' });
    fireEvent.click(resetBtn);
  };

  const wait = (time: number = 2000) => {
    act(() => {
      jest.advanceTimersByTime(time);
    });
  };

  beforeEach(() => {
    render(
      <Theme>
        <Timer initialTime={4} />
      </Theme>
    );
  });

  describe('on render', () => {
    it('label defaults to initial time value', () => {
      expect(screen.getByLabelText('time-label').textContent).toBe('4s');
    });

    it('has a play button', () => {
      expect(
        screen.queryByRole('button', { name: 'play-button' })
      ).toBeTruthy();
    });

    it('does not have a stop button', () => {
      expect(
        screen.queryByRole('button', { name: 'stop-button' })
      ).not.toBeTruthy();
    });

    it('has a reset button', () => {
      expect(
        screen.queryByRole('button', { name: 'reset-timer-button' })
      ).toBeTruthy();
    });

    it('has a progress bar', () => {
      expect(screen.queryByRole('progressbar')).toBeTruthy();
    });

    it('has a progress bar which is completely filled', () => {
      const progressBar = screen.getByRole('progressbar');
      expect(getComputedStyle(progressBar).width).toBe('100%');
    });
  });

  describe('running the timer', () => {
    it('time text decreases while the timer is live', async () => {
      clickPlay();
      const label = screen.getByLabelText('time-label');
      await waitFor(
        () => {
          expect(label.textContent).toBe('3s');
        },
        { timeout: 5000 }
      );
    });

    it('progress bar decreases while the timer is live', async () => {
      clickPlay();
      const progressBar = screen.getByRole('progressbar');
      await waitFor(
        () => {
          expect(getComputedStyle(progressBar).width).toBe('75%');
        },
        { timeout: 5000 }
      );
    });

    it('the stop icon becomes a play icon when the timer hits zero', () => {
      clickPlay();
      wait(5000);
      expect(
        screen.queryByRole('button', { name: 'play-button' })
      ).toBeTruthy();
    });
  });

  describe('stopping the timer', () => {
    it('clicking stop while the timer is live stops the progress bar', () => {
      clickPlay();
      wait();
      clickStop();
      const progressBar = screen.getByRole('progressbar');
      const progress1 = getComputedStyle(progressBar).width;
      wait();
      const progress2 = getComputedStyle(progressBar).width;
      expect(progress1).toEqual(progress2);
    });

    it('clicking stop while the timer is live stops the label text from changing', () => {
      clickPlay();
      wait();
      clickStop();
      const label = screen.getByLabelText('time-label');
      const label1 = label.textContent;
      wait();
      const label2 = label.textContent;
      expect(label1).toEqual(label2);
    });
  });

  describe('resetting the timer', () => {
    it('clicking reset button while live stops the timer', () => {
      clickPlay();
      wait();
      clickReset();
      const progressBar = screen.getByRole('progressbar');
      const progress1 = getComputedStyle(progressBar).width;
      wait();
      const progress2 = getComputedStyle(progressBar).width;
      expect(progress1).toEqual(progress2);
    });

    it('clicking reset button while live resets the progress bar', () => {
      clickPlay();
      wait();
      clickReset();
      const progressBar = screen.getByRole('progressbar');
      fireEvent.click(
        screen.getByRole('button', { name: 'reset-timer-button' })
      );
      expect(getComputedStyle(progressBar).width).toBe('100%');
    });

    it('clicking reset button when the timer has finished resets the time text', () => {
      clickPlay();
      wait(2000);
      clickReset();
      const label = screen.getByLabelText('time-label');
      expect(label.textContent).toBe('4s');
    });

    it('clicking reset when the timer has finished resets the progress bar', () => {
      clickPlay();
      wait(6000);
      clickReset();
      const progressBar = screen.getByRole('progressbar');
      fireEvent.click(
        screen.getByRole('button', { name: 'reset-timer-button' })
      );
      expect(getComputedStyle(progressBar).width).toBe('100%');
    });

    it('clicking reset button when the timer has finished resets the time text', () => {
      clickPlay();
      wait(6000);
      clickReset();
      const label = screen.getByLabelText('time-label');
      expect(label.textContent).toBe('4s');
    });
  });
});

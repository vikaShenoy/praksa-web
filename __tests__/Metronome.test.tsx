import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Metronome from '../components/Metronome';
import Theme from '../components/Theme';

Object.defineProperty(window, 'audioContext', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockBufferSource = { buffer: null, connect: jest.fn(), start: jest.fn() };
const mockAudioContext = {
  createBuffer: jest.fn(),
  createBufferSource: jest.fn().mockImplementation(() => mockBufferSource),
  suspend: jest.fn(),
  resume: jest.fn(),
};
window.AudioContext = jest.fn().mockImplementation(() => mockAudioContext);

describe('Metronome', () => {
  beforeEach(() => {
    render(
      <Theme>
        <Metronome />
      </Theme>
    );
  });

  describe('text', () => {
    it('defaults to 120 bpm', () => {
      const tempoLabel = screen.queryByLabelText('tempo-label');
      expect(tempoLabel).toBeInTheDocument();
      expect(tempoLabel.textContent).toBe('120');
    });
  });

  describe('buttons', () => {
    it('include a button for increasing tempo', () => {
      const plusBtn = screen.getByRole('button', { name: /plus/i });
      expect(plusBtn).toBeDefined();
    });

    it('include a button for decreasing tempo', () => {
      const minusBtn = screen.getByRole('button', { name: /minus/i });
      expect(minusBtn).toBeDefined();
    });

    it('include a play-stop button', () => {
      const playStopBtn = screen.getByRole('button', { name: /play-stop/i });
      expect(playStopBtn).toBeDefined();
    });

    it('clicking the plus button increments the bpm text', () => {
      const plusBtn = screen.getByRole('button', { name: /plus/i });
      fireEvent.click(plusBtn);

      const tempoLabel = screen.queryByLabelText('tempo-label');
      expect(tempoLabel.textContent).toBe('121');
    });

    it('clicking the minus button decrements the bpm text', () => {
      const minusBtn = screen.getByRole('button', { name: /minus/i });
      fireEvent.click(minusBtn);

      const tempoLabel = screen.queryByLabelText('tempo-label');
      expect(tempoLabel.textContent).toBe('119');
    });

    it('clicking the play button changes the icon to a stop icon', () => {
      expect(screen.queryByLabelText('play')).toBeInTheDocument();
      expect(screen.queryByLabelText('stop')).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /play-stop/i }));

      expect(screen.queryByLabelText('play')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('stop')).toBeInTheDocument();
    });

    it('clicking the play button twice changes the icon to a stop icon back to a play icon', () => {
      expect(screen.queryByLabelText('play')).toBeInTheDocument();
      expect(screen.queryByLabelText('stop')).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /play-stop/i }));

      expect(screen.queryByLabelText('play')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('stop')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /play-stop/i }));

      expect(screen.queryByLabelText('play')).toBeInTheDocument();
      expect(screen.queryByLabelText('stop')).not.toBeInTheDocument();
    });
  });

  describe('slider', () => {
    it('is present', () => {
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('can be adjusted to adjust the bpm text', () => {
      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: 180}});
      
      const tempoLabel = screen.queryByLabelText('tempo-label');
      expect(tempoLabel.textContent).toBe('180');
    });
  });
});

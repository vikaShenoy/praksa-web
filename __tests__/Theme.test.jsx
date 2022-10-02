import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Theme from '../components/Theme';

// TODO
describe('Theme component', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <Theme>
          <div>Child</div>
        </Theme>
      </ThemeProvider>
    );
  });

  it('', () => {});

  it('', () => {});

  it('', () => {});
});

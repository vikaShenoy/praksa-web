import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';

// TODO
describe('Layout component', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <Layout>
          <div>Child</div>
        </Layout>
      </ThemeProvider>
    );
  });

  it('', () => {});

  it('', () => {});

  it('', () => {});
});

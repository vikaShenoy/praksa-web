import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Navbar from '../components/Navbar';
import Theme from '../components/Theme';

describe('Navbar', () => {
  jest.mock(
    'next/link',
    () =>
      ({ children }: { children: React.ReactNode }) =>
        children
  );

  beforeEach(() => {
    render(
      <Theme>
        <Navbar />
      </Theme>
    );
  });

  it('renders the title', () => {
    const title = screen.getByText('Praksa');
    expect(title).toBeInTheDocument();
  });

  it('renders a home link', () => {
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  it('home page link has the correct href', () => {
    const homeLink = screen.getByText('Home');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders an about link', () => {
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
  });

  it('about page link has the correct href', () => {
    const homeLink = screen.getByText('About');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/about');
  });

  it('does not show the hamburger icon when the screen is wide', () => {
    const menuIcon = screen.queryByTestId('menu-icon');
    expect(menuIcon).not.toBeInTheDocument();
  });
});

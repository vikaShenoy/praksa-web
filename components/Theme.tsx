import { ThemeProvider } from 'styled-components';

const baseTheme = {
  spacing: {
    sm: 8,
    sm2: 16,
    md: 24,
    md2: 32,
    lg: 48,
  },
  fontSize: {
    sm: '1em',
    md: '2em',
    lg: '3em',
  },
};

const darkTheme = {
  colors: {
    background: '#121212',
    primary: '#1E113A',
    secondary: '#513097',
    primaryText: '#FFFFFF',
  },
};

interface Props {
  children: React.ReactNode;
}

const Theme = ({ children }: Props) => {
  return (
    <ThemeProvider theme={{ ...darkTheme, ...baseTheme }}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;

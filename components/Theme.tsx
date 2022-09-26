import { ThemeProvider } from 'styled-components';

const baseTheme = {
  spacing: {
    sm: "8px",
    sm2: "16px",
    md: "24px",
    md2: "32px",
    lg: "48px",
  },
  fontSize: {
    sm: '1em',
    md: '2em',
    lg: '3em',
  },
  font: {
    title: "'Proza Libre', sans-serif",
    body: "'Lato', sans-serif",
  },
  dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
};

const darkTheme = {
  colors: {
    background: '#121212',
    primary: '#1E113A',
    secondary: '#513097',
    primaryText: '#FFFFFF',
  }
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

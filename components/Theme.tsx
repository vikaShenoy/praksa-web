import { ThemeProvider } from 'styled-components';

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
    <ThemeProvider theme={{ ...darkTheme }}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;

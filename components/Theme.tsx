import { ThemeProvider } from 'styled-components';

const darkTheme = {
  colors: {
    background: '#121212',
    primary: '#1E113A',
    secondary: '#513097',
    primaryText: '#FFFFFF',
    disabled: '#E0E0E01A',
    icon: "#FFFFFF"
  },
  shadows: {
    navbar: "0px -5px 20px 0px rgba(0, 0, 0, 0.5)",
    card: "0px -5px 10px 0px rgba(0, 0, 0, 0.5)",
    cardHover: "0px -5px 20px 0px rgba(0, 0, 0, 0.5)",
    buttonHover: "0px -5px 20px 0px rgba(0, 0, 0, 0.5)"
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

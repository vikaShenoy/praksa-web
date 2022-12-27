import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { defaultTheme } from '../styles/theme/defaultTheme'

const GlobalStyle = createGlobalStyle`
  body, p, h1, h2, h3, h4, h5, h6, hr {
   margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`
interface ThemeProps {
  children: React.ReactNode
}

const Theme = ({ children }: ThemeProps) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={{ ...defaultTheme }}>{children}</ThemeProvider>
    </>
  )
}

export default Theme

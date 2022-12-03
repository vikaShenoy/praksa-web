import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../styles/theme/defaultTheme'

interface Props {
  children: React.ReactNode
}

const Theme = ({ children }: Props) => {
  return <ThemeProvider theme={{ ...defaultTheme }}>{children}</ThemeProvider>
}

export default Theme

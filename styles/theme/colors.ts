export interface ColorStyles {
  background: string
  primary: string
  secondary: string
  secondaryHover: string
  accent: string
  accentHover: string
  disabled: string
  icon: string
  text: {
    primary: string,
    error: string
  }
}

export const colors: ColorStyles = {
  background: '#121212',
  primary: '#1E113A',
  secondary: '#513097',
  secondaryHover: '#513097BF',
  accent: '#87693B',
  accentHover: '#87693BBF',
  disabled: '#E0E0E01A',
  icon: '#FFFFFF',
  text: {
    primary: '#E0E0E0',
    error: '#D13838'
  },
}

export interface ColorStyles {
  background: string
  primary: string
  secondary: string
  secondaryHover: string
  tertiary: string
  accent: string
  accentHover: string
  faded: string
  icon: string
  text: {
    primary: string,
    error: string
  }
}

const hex75Opacity = 'BF'

export const colors: ColorStyles = {
  background: '#121212',
  primary: '#1E113A',
  secondary: '#513097',
  secondaryHover: `#513097${hex75Opacity}`,
  tertiary: '#321A66',
  accent: '#87693B',
  accentHover: `#87693B$${hex75Opacity}`,
  faded: '#32264B',
  icon: '#FFFFFF',
  text: {
    primary: '#E0E0E0',
    error: '#D13838'
  },
}

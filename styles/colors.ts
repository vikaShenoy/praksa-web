export interface ColorStyles {
  background: string
  primary: string
  secondary: string
  secondaryHover: string
  tertiary: string
  accent: string
  accentHover: string
  disabled: string
  icon: string
  text: {
    primary: string
  }
}

const accent = '#87693B'
const secondary = '#513097'

export const colors: ColorStyles = {
  background: '#121212',
  primary: '#1E113A',
  secondary,
  secondaryHover: `${secondary}BF`,
  tertiary: '#321A66',
  accent,
  accentHover: `${accent}BF`,
  disabled: '#E0E0E01A',
  icon: '#FFFFFF',
  text: {
    primary: '#E0E0E0',
  },
}

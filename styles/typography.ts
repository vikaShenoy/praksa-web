export interface TypographyStyles {
  weight: {
    light: number
    regular: number
    bold: number
  }
  size: {
    sm: string
    md: string
    lg: string
  }
  font: {
    title: string
    body: string
  }
}

export const typography: TypographyStyles = {
  weight: {
    light: 300,
    regular: 400,
    bold: 700,
  },
  size: {
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
  },
  font: {
    title: "'Proza Libre', sans-serif",
    body: "'Lato', sans-serif",
  },
}

export interface TypographyStyles {
  weight: {
    light: number
    regular: number
    bold: number
  }
  size: {
    xs: string
    sm: string
    smmd: string
    md: string
    mdlg: string
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
    xs: '0.75rem',
    sm: '1rem',
    smmd: '1.5rem',
    md: '2rem',
    mdlg: '2.5rem',
    lg: '3rem',
  },
  font: {
    title: "'Proza Libre', sans-serif",
    body: "'Lato', sans-serif",
  },
}

export interface SizeStyles {
  components: {
    minCardWidth: string
    cardWidth: string
    sliderHeight: string
    sliderThumbSize: string
    progressBarHeight: string
  }
  breakpoints: {
    sm: number
  }
  borderRadius: string
}

export const sizes: SizeStyles = {
  components: {
    sliderHeight: '0.75rem',
    sliderThumbSize: '2rem',
    progressBarHeight: '1.5rem',
    minCardWidth: '20rem',
    cardWidth: '25%',
  },
  breakpoints: {
    sm: 500,
  },
  borderRadius: '1.5rem',
}

export interface SizeStyles {
  components: {
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
    cardWidth: '25rem'
  },
  breakpoints: {
    sm: 500
  },
  borderRadius: '1.5rem'
}
import { colors, ColorStyles } from './colors'
import { shadows, ShadowStyles } from './shadows'
import { sizes, SizeStyles } from './size'
import { spacing, SpacingStyles } from './spacing'
import { typography, TypographyStyles } from './typography'

export interface Styles {
  colors: ColorStyles
  spacing: SpacingStyles
  shadows: ShadowStyles
  typography: TypographyStyles
  sizes: SizeStyles
}

export const defaultTheme: Styles = {
  colors,
  spacing,
  shadows,
  typography,
  sizes,
}

import { colors, ColorStyles } from './colors'
import { shadows, ShadowStyles } from './shadows'
import { spacing, SpacingStyles } from './spacing'
import { typography, TypographyStyles } from './typography'

export interface Styles {
  colors: ColorStyles
  spacing: SpacingStyles
  shadows: ShadowStyles
  typography: TypographyStyles
}

export const defaultTheme: Styles = {
  colors,
  spacing,
  shadows,
  typography,
}

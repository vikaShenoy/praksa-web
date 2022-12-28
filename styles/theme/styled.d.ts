import 'styled-components'
import type { ColorStyles } from './colors'
import type { ShadowStyles } from './shadows'
import type { SpacingStyles } from './spacing'
import type { TypographyStyles } from './typography'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorStyles
    spacing: SpacingStyles
    shadows: ShadowStyles
    typography: TypographyStyles
  }
}

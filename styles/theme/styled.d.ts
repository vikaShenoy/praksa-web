import 'styled-components'
import type { ColorStyles } from './colors'
import type { ShadowStyles } from './shadows'
import { SizeStyles } from './size'
import type { SpacingStyles } from './spacing'
import type { TypographyStyles } from './typography'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorStyles
    spacing: SpacingStyles
    shadows: ShadowStyles
    sizes: SizeStyles
    typography: TypographyStyles
  }
}

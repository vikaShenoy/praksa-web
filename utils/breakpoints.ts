import { css } from "styled-components"
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../hooks/useResponsive"

export const mobile = (inner: any) => css`
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    ${inner};
  }
`

export const tablet = (inner: any) => css`
  @media (max-width: ${TABLET_BREAKPOINT}px) {
    ${inner};
  }
`
